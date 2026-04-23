import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  forwarded_to_sheet: boolean;
  created_at: string;
}

export const Route = createFileRoute("/admin/submissions")({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const [rows, setRows] = useState<Submission[] | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Submission[]);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  }

  return (
    <div>
      <h2 className="text-xl font-serif mb-4">Contact Submissions</h2>
      {rows === null && <p className="text-muted-foreground text-sm">Loading…</p>}
      {rows && rows.length === 0 && <p className="text-muted-foreground text-sm">No submissions yet.</p>}
      {rows && rows.length > 0 && (
        <div className="space-y-4">
          {rows.map((s) => (
            <article key={s.id} className="rounded-xl border border-border bg-card p-5">
              <header className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="font-medium">{s.name} <span className="text-muted-foreground font-normal">&lt;{s.email}&gt;</span></h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(s.created_at).toLocaleString()}
                    {s.phone && ` · ${s.phone}`}
                    {s.forwarded_to_sheet ? " · ✓ Forwarded to Sheet" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${s.email}`} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted">Reply</a>
                  <button onClick={() => remove(s.id)} className="rounded-md border border-destructive/40 text-destructive text-sm px-3 py-1.5 hover:bg-destructive/5">Delete</button>
                </div>
              </header>
              {s.subject && <p className="mt-3 font-medium">{s.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{s.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
