import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth

Sitemap: ${SITE_URL}/sitemap.xml
`;
        return new Response(body, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
