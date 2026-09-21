# Activate WhatsApp Alerts for New Enquiries

## How it works (end to end)

1. A visitor fills the contact form and clicks **Request Consultation**.
2. The enquiry is saved to Admin → Submissions (this already works, alerts can never break it).
3. The site sends a WhatsApp message to **+971 55 472 5790** with the sender's name, contact details, booking slot and message.
4. Delivery results (sent / delivered / read / failed) are recorded, and a webhook receiver logs every WhatsApp event.

## Current state

- Send code, webhook receiver, and notification tracking tables: **already built**.
- WhatsApp Business number: **not connected** — the connect card was skipped earlier, so no messages can go out yet.

## Remaining steps

1. **Link the WhatsApp Business number** — a connect card will appear; sign in with the WhatsApp Business account for the number to receive alerts.
2. **Submit the alert template for Meta approval** — a short UTILITY template ("New enquiry from {name}..."). Meta approval usually takes hours, up to 48. Business-initiated WhatsApp messages outside the 24-hour reply window must use an approved template.
3. **Point incoming messages at this project** — under Connectors → WhatsApp → Incoming messages, select this project, so delivery confirmations and replies are received.
4. **Run a live test** — submit a test enquiry and confirm the WhatsApp alert arrives on +971 55 472 5790.

## Notes

- Until Meta approves the template, alerts stay silent but enquiries keep saving normally.
- Replying to a customer who messaged first (within 24 hours) needs no template.
- Email forwarding to info@biznessdoctor.com is a separate pending decision (Pro-plan email domain vs third-party sender vs skip).
