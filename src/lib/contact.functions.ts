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
    const supabaseUrl =
      process.env["SUPABASE_URL"] ||
      import.meta.env.VITE_SUPABASE_URL ||
      "https://imcveonylfefpcfwukiu.supabase.co";
    const publishableKey =
      process.env["SUPABASE_PUBLISHABLE_KEY"] ||
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltY3Zlb255bGZlZnBjZnd1a2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjE1ODIsImV4cCI6MjA5MjQ5NzU4Mn0.sK8mpXNaQLk47tfaKWeyVkri-n190pTp3Sa4gP8tjnY";

    const contactClient = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false },
    });

    const phone = data.phone?.trim() || null;
    const subject = data.subject?.trim() || null;

    const { error } = await contactClient
      .from("contact_submissions")
      .insert({
        name: data.name.trim(),
        email: data.email.trim(),
        phone,
        subject,
        message: data.message.trim(),
      });

    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Failed to save submission");
    }

    // Optionally forward to Google Apps Script webhook (linked to a Google Sheet)
    const webhook = process.env["GOOGLE_SHEET_WEBHOOK_URL"];
    const serviceRole = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (webhook && serviceRole) {
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
          console.info("contact submission forwarded to sheet");
        } else {
          console.error("Sheet webhook non-OK:", res.status, await res.text());
        }
      } catch (e) {
        console.error("Sheet webhook failed", e);
      }
    }

    return { ok: true };
  });
