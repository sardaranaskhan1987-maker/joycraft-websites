import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostEditor, type PostFormValue } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/blog/$id/edit")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const [data, setData] = useState<PostFormValue | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, cover_image_url, published")
      .eq("id", id)
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (error) setErr(error.message);
        else if (!row) setErr("Post not found");
        else setData({
          id: row.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt ?? "",
          content: row.content ?? "",
          cover_image_url: row.cover_image_url,
          published: row.published,
        });
      });
  }, [id]);

  if (err) return <p className="text-destructive">{err}</p>;
  if (!data) return <p className="text-muted-foreground">Loading…</p>;
  return (
    <div>
      <h2 className="text-xl font-serif mb-6">Edit Post</h2>
      <PostEditor initial={data} />
    </div>
  );
}
