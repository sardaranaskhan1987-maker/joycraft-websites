import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Bizness Doctor" },
      {
        name: "description",
        content:
          "Book a 15-minute fit call. Independent advisory on corporate tax, financial governance, and capital risk. UAE & international.",
      },
      { property: "og:title", content: "Contact Bizness Doctor — Book a 15-Minute Fit Call" },
      {
        property: "og:description",
        content: "Direct enquiries via email, phone, WhatsApp, or our short contact form.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contact" }],
  }),
  component: lazyRouteComponent(() => import("@/components/pages/ContactPage"), "ContactPage"),
});
