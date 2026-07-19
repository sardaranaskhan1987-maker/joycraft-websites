import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://biznessdoctor.com";

let _admin: ReturnType<typeof createClient> | null = null;
function getAdmin() {
  if (_admin) return _admin;
  _admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  return _admin;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/services", "/training", "/insights", "/blog", "/contact"];
        let postUrls: { loc: string; lastmod?: string }[] = [];
        try {
          const { data } = await getAdmin()
            .from("blog_posts")
            .select("slug, updated_at, published_at")
            .eq("published", true)
            .order("published_at", { ascending: false })
            .limit(1000);
          postUrls = ((data ?? []) as Array<{ slug: string; updated_at: string | null; published_at: string | null }>).map((p) => ({
            loc: `${SITE_URL}/blog/${p.slug}`,
            lastmod: p.updated_at ?? p.published_at ?? undefined,
          }));
        } catch (e) {
          console.error("sitemap blog fetch failed", e);
        }

        const urls: { loc: string; lastmod?: string }[] = [
          ...staticPaths.map((p) => ({ loc: `${SITE_URL}${p}` })),
          ...postUrls,
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>`;
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
