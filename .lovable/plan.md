# WhatsApp alert for new enquiries

Goal: when someone submits the contact form, you receive a WhatsApp message with the enquiry details.

## How it will work

1. You connect your WhatsApp Business number in Lovable (a connect card appears in chat — pick or create the connection).
2. Every new enquiry is saved as today, then a WhatsApp alert is sent to your number with the sender's name, email, phone, subject, booking date/time/timezone, and the message.
3. If the alert fails to send, the enquiry is still saved — you never lose a submission. Failures are recorded so nothing goes silently missing.

## Important about WhatsApp rules

WhatsApp does not allow a business to start a chat with free text. The first alert must use a short message template that Meta approves (usually a few hours, up to 48). So:

- I create a template for the alert wording and submit it for approval.
- Until it is approved, alerts will not deliver; enquiries keep saving normally under Admin → Submissions.
- Once approved, alerts start flowing automatically with no further changes.

## What you need to confirm

- Which number should receive the alerts (I will use +971 55 472 5790 unless you tell me otherwise).

## Technical details

- Connect the WhatsApp Business connector; alerts are sent server-side through the Lovable connector gateway (`/messages`), never from the browser.
- New table `whatsapp_notifications`: enquiry id, recipient, provider message id, state (`accepted`/`sent`/`delivered`/`failed`), error text, timestamps. RLS restricts reads to admins; grants added in the same migration.
- `src/lib/contact.functions.ts`: after the insert succeeds, send the template message, record the returned `messages[0].id` with state `accepted`. Send errors are logged as failed rows; the submit response stays successful.
- Create the receiver `src/routes/api/public/whatsapp/webhook.ts`: verifies each delivery with `verifyWebhookRequest` from `@lovable.dev/webhooks-js` using `WHATSAPP_API_KEY`, stores every verified delivery in a new `whatsapp_webhook_events` inbox table (unique `delivery_id`, event, payload, processing state), then reconciles `statuses[]` against `whatsapp_notifications` so later states never overwrite newer ones. Returns 401 on bad signature, 5xx on storage failure.
- Template: a UTILITY template with body variables for name, contact detail, and a short summary, created via `POST /message_templates` with sample values; delivery only after Meta marks it `APPROVED`.
- Incoming callbacks must be pointed at this project under Connectors → WhatsApp → Incoming messages; I will flag this as a setup step for you.
