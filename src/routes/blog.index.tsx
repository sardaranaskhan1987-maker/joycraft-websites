import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  component: BlogIndex,
});

function BlogIndex() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setError(error.message);
        else setPosts((data ?? []) as PostListItem[]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container-narrow py-16">
      <header className="max-w-3xl">
        <span className="eyebrow">Blog</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-4">Articles &amp; Analysis</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Governance-led perspectives on UAE corporate tax, financial oversight, and capital risk.
        </p>
      </header>

      <div className="mt-12">
        {error && <p className="text-sm text-destructive">Failed to load posts: {error}</p>}
        {posts === null && !error && <p className="text-muted-foreground">Loading…</p>}
        {posts && posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        )}
        {posts && posts.length > 0 && (
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
                  {p.excerpt && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>}
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
