import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Row {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
}

export const Route = createFileRoute("/admin/")({
  component: PostsList,
});

function PostsList() {
  const [rows, setRows] = useState<Row[] | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, published, published_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Row[]);
  }
  useEffect(() => { load(); }, []);

  async function togglePublish(r: Row) {
    const next = !r.published;
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: next, published_at: next ? new Date().toISOString() : null })
      .eq("id", r.id);
    if (error) toast.error(error.message);
    else { toast.success(next ? "Published" : "Unpublished"); load(); }
  }

  async function remove(r: Row) {
    if (!confirm(`Delete "${r.title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", r.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  }

  return (
    <div>
      <h2 className="text-xl font-serif mb-4">Blog Posts</h2>
      {rows === null && <p className="text-muted-foreground text-sm">Loading…</p>}
      {rows && rows.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">No posts yet.</p>
          <Link to="/admin/blog/new" className="mt-3 inline-flex rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground">Create your first post</Link>
        </div>
      )}
      {rows && rows.length > 0 && (
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 p-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{r.title}</h3>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${r.published ? "bg-accent text-navy" : "bg-muted text-muted-foreground"}`}>
                    {r.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">/{r.slug} · updated {new Date(r.updated_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => togglePublish(r)} className="rounded-md border border-border px-3 py-1.5 hover:bg-muted">
                  {r.published ? "Unpublish" : "Publish"}
                </button>
                <Link to="/admin/blog/$id/edit" params={{ id: r.id }} className="rounded-md bg-navy px-3 py-1.5 text-primary-foreground">Edit</Link>
                <button onClick={() => remove(r)} className="rounded-md border border-destructive/40 text-destructive px-3 py-1.5 hover:bg-destructive/5">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
