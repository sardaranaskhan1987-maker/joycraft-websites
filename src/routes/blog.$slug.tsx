import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { lazy, Suspense } from "react";
import { z } from "zod";

const Markdown = lazy(async () => {
  const [{ default: ReactMarkdown }, { default: remarkGfm }] = await Promise.all([
    import("react-markdown"),
    import("remark-gfm"),
  ]);
  return {
    default: ({ children }: { children: string }) => (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    ),
  };
});

const SITE_URL = "https://biznessdoctor.com";

interface PublicPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

export const fetchPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }): Promise<PublicPost | null> => {
    const SUPABASE_URL = process.env.SUPABASE_URL!;
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
    const { data: post, error } = await admin
      .from("blog_posts")
      .select("id, slug, title, excerpt, content, cover_image_url, published_at, created_at, published")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("fetchPostBySlug error", error);
      return null;
    }
    if (!post) return null;
    return post as PublicPost;
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Article | Bizness Doctor" }] };
    }
    const url = `${SITE_URL}/blog/${post.slug}`;
    const desc = post.excerpt ?? `${post.title} — Bizness Doctor article`;
    return {
      meta: [
        { title: `${post.title} | Bizness Doctor` },
        { name: "description", content: desc.slice(0, 160) },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc.slice(0, 160) },
        { property: "og:url", content: url },
        ...(post.cover_image_url
          ? [
              { property: "og:image", content: post.cover_image_url },
              { name: "twitter:image", content: post.cover_image_url },
            ]
          : []),
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: desc.slice(0, 160) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: desc,
            image: post.cover_image_url ? [post.cover_image_url] : undefined,
            datePublished: post.published_at ?? post.created_at,
            dateModified: post.published_at ?? post.created_at,
            mainEntityOfPage: url,
            publisher: {
              "@type": "Organization",
              name: "Bizness Doctor",
              url: SITE_URL,
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-narrow py-20 text-center">
      <h1 className="text-4xl font-serif">Article not found</h1>
      <p className="text-muted-foreground mt-2">It may have been moved or unpublished.</p>
      <Link to="/blog" className="mt-6 inline-block text-accent underline">Back to Blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-narrow py-20 text-center">
      <h1 className="text-2xl font-serif">Something went wrong</h1>
      <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      <Link to="/blog" className="mt-6 inline-block text-accent underline">Back to Blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const date = new Date(post.published_at ?? post.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="container-narrow py-16 max-w-3xl">
      <Link to="/blog" className="text-sm text-muted-foreground hover:text-navy">← Back to Blog</Link>
      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-serif leading-tight tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-3">{date}</p>
        {post.excerpt && <p className="text-lg text-muted-foreground mt-4">{post.excerpt}</p>}
      </header>
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mt-8 w-full rounded-xl border border-border"
        />
      )}
      <div className="prose-blog mt-8">
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading article…</div>}>
          <Markdown>{post.content}</Markdown>
        </Suspense>
      </div>
    </article>
  );
}
