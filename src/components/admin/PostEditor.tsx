import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

export interface PostFormValue {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
}

interface Props {
  initial?: PostFormValue;
}

export function PostEditor({ initial }: Props) {
  const navigate = useNavigate();
  const [v, setV] = useState<PostFormValue>(
    initial ?? { title: "", slug: "", excerpt: "", content: "", cover_image_url: null, published: false },
  );
  const [busy, setBusy] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!initial?.id);

  useEffect(() => {
    if (autoSlug) setV((p) => ({ ...p, slug: slugify(p.title) }));
  }, [v.title, autoSlug]);

  async function uploadCover(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `covers/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: false });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setV((p) => ({ ...p, cover_image_url: data.publicUrl }));
    toast.success("Cover uploaded");
  }

  async function uploadInline(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `inline/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: false });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setV((p) => ({ ...p, content: `${p.content}\n\n![image](${data.publicUrl})\n` }));
    toast.success("Image inserted into content");
    e.target.value = "";
  }

  async function save(opts: { publish?: boolean } = {}) {
    if (!v.title.trim() || !v.slug.trim()) return toast.error("Title and slug are required");
    setBusy(true);
    try {
      const userResp = await supabase.auth.getUser();
      const author_id = userResp.data.user?.id ?? null;
      const willPublish = opts.publish ?? v.published;
      const payload = {
        title: v.title.trim(),
        slug: v.slug.trim(),
        excerpt: v.excerpt.trim() || null,
        content: v.content,
        cover_image_url: v.cover_image_url,
        published: willPublish,
        published_at: willPublish ? (initial?.id ? undefined : new Date().toISOString()) : null,
        author_id,
      };

      if (v.id) {
        const updatePayload = { ...payload };
        if (willPublish && !initial?.published) updatePayload.published_at = new Date().toISOString();
        else if (willPublish) delete (updatePayload as Partial<typeof updatePayload>).published_at;
        const { error } = await supabase.from("blog_posts").update(updatePayload).eq("id", v.id);
        if (error) throw error;
        toast.success("Saved");
      } else {
        const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
        if (error) throw error;
        toast.success("Created");
        navigate({ to: "/admin/blog/$id/edit", params: { id: data.id } });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Slug
          <button type="button" onClick={() => setAutoSlug((a) => !a)} className="ml-2 text-xs text-muted-foreground underline">
            {autoSlug ? "(auto from title — click to edit)" : "(manual — click to auto)"}
          </button>
        </label>
        <input
          value={v.slug}
          onChange={(e) => { setAutoSlug(false); setV({ ...v, slug: slugify(e.target.value) }); }}
          className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <textarea value={v.excerpt} onChange={(e) => setV({ ...v, excerpt: e.target.value })} rows={2} maxLength={300} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cover Image</label>
        {v.cover_image_url && (
          <img src={v.cover_image_url} alt="cover" className="w-full max-h-56 object-cover rounded-md border border-border mb-2" />
        )}
        <div className="flex items-center gap-2">
          <input type="file" accept="image/*" onChange={uploadCover} className="text-sm" />
          {v.cover_image_url && (
            <button onClick={() => setV({ ...v, cover_image_url: null })} className="text-xs text-destructive underline">remove</button>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium">Content (Markdown)</label>
          <label className="text-xs text-muted-foreground cursor-pointer hover:text-navy">
            Insert image
            <input type="file" accept="image/*" onChange={uploadInline} className="hidden" />
          </label>
        </div>
        <textarea
          value={v.content}
          onChange={(e) => setV({ ...v, content: e.target.value })}
          rows={20}
          className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm leading-relaxed"
          placeholder="# Heading

Write your post in Markdown. Use **bold**, *italic*, [links](https://...), lists, and images.
"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
        <button disabled={busy} onClick={() => save()} className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-muted">
          Save Draft
        </button>
        <button disabled={busy} onClick={() => save({ publish: true })} className="rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
          {v.published ? "Save & keep published" : "Publish"}
        </button>
        {v.published && (
          <button disabled={busy} onClick={() => save({ publish: false })} className="text-sm text-muted-foreground underline">
            Unpublish
          </button>
        )}
      </div>
    </div>
  );
}
