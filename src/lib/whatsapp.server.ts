const GATEWAY_URL = "https://connector-gateway.lovable.dev/whatsapp";

export const ALERT_TEMPLATE_NAME = "new_enquiry_alert";

type SendResult =
  | { ok: true; messageId: string | null; recipient: string }
  | { ok: false; error: string; recipient: string };

function credentials() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const whatsappKey = process.env["WHATSAPP_API_KEY"];
  return { lovableKey, whatsappKey };
}

export function alertRecipient(): string {
  // Digits only, no leading '+', as required by the WhatsApp API.
  return (process.env["WHATSAPP_ALERT_TO"] || "971554725790").replace(/\D/g, "");
}

async function post(path: string, body: unknown) {
  const { lovableKey, whatsappKey } = credentials();
  if (!lovableKey || !whatsappKey) {
    throw new Error("WhatsApp connection is not configured");
  }
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": whatsappKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`WhatsApp request failed [${res.status}]: ${text}`);
  }
  try {
    return JSON.parse(text) as Record<string, any>;
  } catch {
    return {} as Record<string, any>;
  }
}

export function isWhatsAppConfigured(): boolean {
  const { lovableKey, whatsappKey } = credentials();
  return Boolean(lovableKey && whatsappKey);
}

/** Truncate to a WhatsApp-parameter-safe single line. */
function oneLine(value: string, max = 220): string {
  const flat = value.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

export async function sendEnquiryAlert(input: {
  name: string;
  contact: string;
  summary: string;
}): Promise<SendResult> {
  const recipient = alertRecipient();
  const params = [oneLine(input.name, 60), oneLine(input.contact, 80), oneLine(input.summary)];

  try {
    const data = await post("/messages", {
      messaging_product: "whatsapp",
      to: recipient,
      type: "template",
      template: {
        name: ALERT_TEMPLATE_NAME,
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: params.map((text) => ({ type: "text", text })),
          },
        ],
      },
    });
    return { ok: true, messageId: data?.messages?.[0]?.id ?? null, recipient };
  } catch (templateError) {
    // Fall back to a free-form message (valid inside the 24-hour window).
    try {
      const data = await post("/messages", {
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: {
          body: `New enquiry on biznessdoctor.com\n\nFrom: ${params[0]}\nContact: ${params[1]}\n\n${params[2]}`,
        },
      });
      return { ok: true, messageId: data?.messages?.[0]?.id ?? null, recipient };
    } catch (textError) {
      return {
        ok: false,
        recipient,
        error: `${(templateError as Error).message} | fallback: ${(textError as Error).message}`,
      };
    }
  }
}
