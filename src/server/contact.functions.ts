import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL!;
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    const phone = data.phone?.trim() || null;
    const subject = data.subject?.trim() || null;

    const { data: inserted, error } = await admin
      .from("contact_submissions")
      .insert({
        name: data.name.trim(),
        email: data.email.trim(),
        phone,
        subject,
        message: data.message.trim(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Failed to save submission");
    }

    // Optionally forward to Google Apps Script webhook (linked to a Google Sheet)
    const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhook) {
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: data.name.trim(),
            email: data.email.trim(),
            phone: phone ?? "",
            subject: subject ?? "",
            message: data.message.trim(),
          }),
        });
        if (res.ok) {
          await admin
            .from("contact_submissions")
            .update({ forwarded_to_sheet: true })
            .eq("id", inserted.id);
        } else {
          console.error("Sheet webhook non-OK:", res.status, await res.text());
        }
      } catch (e) {
        console.error("Sheet webhook failed", e);
      }
    }

    return { ok: true };
  });
