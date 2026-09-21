import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookRequest } from "@lovable.dev/webhooks-js";

const STATE_RANK: Record<string, number> = {
  accepted: 0,
  sent: 1,
  delivered: 2,
  read: 3,
  failed: 4,
};

export const Route = createFileRoute("/api/public/whatsapp/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WHATSAPP_API_KEY"];
        if (!secret) {
          return new Response("Not configured", { status: 503 });
        }

        let body: string;
        try {
          const verified = await verifyWebhookRequest({
            req: request,
            secret,
            maxBodyBytes: 4 * 1024 * 1024,
          });
          body = verified.body;
        } catch {
          return new Response("Invalid signature", { status: 401 });
        }


        const deliveryId = request.headers.get("X-Lovable-Delivery");
        const event = request.headers.get("X-Lovable-Event");
        if (!deliveryId || !event) {
          return new Response("Missing delivery headers", { status: 400 });
        }

        let payload: any;
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: existing, error: selectError } = await supabaseAdmin
          .from("whatsapp_webhook_events")
          .select("id, processed_at")
          .eq("delivery_id", deliveryId)
          .maybeSingle();
        if (selectError) {
          console.error("webhook inbox read failed", selectError);
          return new Response("Storage error", { status: 500 });
        }

        if (!existing) {
          const { error: insertError } = await supabaseAdmin
            .from("whatsapp_webhook_events")
            .insert({ delivery_id: deliveryId, event, payload });
          if (insertError && insertError.code !== "23505") {
            console.error("webhook inbox write failed", insertError);
            return new Response("Storage error", { status: 500 });
          }
        } else if (existing.processed_at) {
          return new Response("ok");
        }

        // Process: reconcile delivery statuses against sent alerts.
        try {
          const statuses: any[] = payload?.entry?.[0]?.changes?.[0]?.value?.statuses ?? [];
          for (const status of statuses) {
            const messageId: string | undefined = status?.id;
            if (!messageId) continue;

            const { data: row } = await supabaseAdmin
              .from("whatsapp_notifications")
              .select("id, state")
              .eq("provider_message_id", messageId)
              .maybeSingle();
            if (!row) continue;

            const nextState = String(status.status ?? "").toLowerCase();
            const currentRank = STATE_RANK[row.state] ?? 0;
            const nextRank = STATE_RANK[nextState] ?? 0;
            const ts = status.timestamp
              ? new Date(Number(status.timestamp) * 1000).toISOString()
              : new Date().toISOString();

            const update: {
              provider_timestamp: string;
              updated_at: string;
              state?: string;
              error?: string;
            } = {
              provider_timestamp: ts,
              updated_at: new Date().toISOString(),
            };
            if (nextRank >= currentRank && nextState) update.state = nextState;
            if (status.errors?.length) update.error = JSON.stringify(status.errors);

            await supabaseAdmin
              .from("whatsapp_notifications")
              .update(update)
              .eq("id", row.id);
          }

          await supabaseAdmin
            .from("whatsapp_webhook_events")
            .update({ processed_at: new Date().toISOString(), processing_error: null })
            .eq("delivery_id", deliveryId);
        } catch (e) {
          console.error("webhook processing failed", e);
          await supabaseAdmin
            .from("whatsapp_webhook_events")
            .update({ processing_error: String(e) })
            .eq("delivery_id", deliveryId);
          return new Response("Processing error", { status: 500 });
        }

        return new Response("ok");
      },
    },
  },
});
