import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://biznessdoctor.com";

interface PostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

let _admin: ReturnType<typeof createClient> | null = null;
function getAdmin() {
  if (_admin) return _admin;
  _admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  return _admin;
}

export const fetchPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PostListItem[]> => {
    const { data, error } = await getAdmin()
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) {
      console.error("fetchPublishedPosts error", error);
      return [];
    }
    return (data ?? []) as PostListItem[];
  },
);

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Bizness Doctor" },
      {
        name: "description",
        content:
          "Long-form articles on UAE corporate tax, VAT, financial governance, cross-border structuring, and capital risk.",
      },
      { property: "og:title", content: "Bizness Doctor Blog" },
      {
        property: "og:description",
        content: "Long-form articles on tax, governance, and financial structure.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/blog" }],
  }),
  loader: async () => ({ posts: await fetchPublishedPosts() }),
  errorComponent: ({ error }) => (
    <div className="container-narrow py-20 text-center">
      <h1 className="text-2xl font-serif">Couldn't load articles</h1>
      <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts }: { posts: PostListItem[] } = Route.useLoaderData();

  return (
    <div className="container-narrow py-10">
      <header className="max-w-3xl">
        <span className="eyebrow">Blog</span>
        <h1 className="text-3xl md:text-4xl font-serif leading-tight tracking-tight mt-4">Articles &amp; Analysis</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Governance-led perspectives on UAE corporate tax, financial oversight, and capital risk.
        </p>
      </header>

      <div className="mt-12">
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        )}
        {posts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition group"
              >
                {p.cover_image_url ? (
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[16/10] bg-secondary" />
                )}
                <div className="p-5">
                  <h2 className="text-lg font-serif group-hover:text-navy">{p.title}</h2>
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">
                    {(p.published_at ?? p.created_at) &&
                      new Date(p.published_at ?? p.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
