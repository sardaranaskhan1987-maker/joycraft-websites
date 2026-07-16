import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | Bizness Doctor" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/admin" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handle(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-narrow py-20 max-w-md">
      <h1 className="text-3xl font-serif">Admin Access</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Sign in to manage blog posts and contact submissions.
      </p>
      <form onSubmit={handle} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <button disabled={busy} className="w-full inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
          {busy ? "Please wait…" : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground">
        <Link to="/" className="underline">← Back to site</Link>
      </p>
    </div>
  );
}
