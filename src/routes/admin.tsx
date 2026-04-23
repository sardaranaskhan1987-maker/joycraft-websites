import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Bizness Doctor" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { loading, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="container-narrow py-20 text-muted-foreground">Loading…</div>;
  }
  if (!user) {
    return (
      <div className="container-narrow py-20 max-w-md text-center">
        <h1 className="text-2xl font-serif">Sign in required</h1>
        <p className="text-sm text-muted-foreground mt-2">Admin access is restricted.</p>
        <Link to="/auth" className="mt-6 inline-flex rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground">Go to Sign In</Link>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="container-narrow py-20 max-w-xl">
        <h1 className="text-2xl font-serif">Awaiting admin access</h1>
        <p className="text-sm text-muted-foreground mt-3">
          Your account ({user.email}) is signed in but does not yet have admin role.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          To grant admin to this account, run the following SQL in Lovable Cloud → SQL editor:
        </p>
        <pre className="mt-3 rounded-md bg-muted p-3 text-xs overflow-auto">
{`insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = '${user.email}'
on conflict do nothing;`}
        </pre>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
          className="mt-4 text-sm text-muted-foreground underline hover:text-navy"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="container-narrow py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-navy font-semibold" }} className="text-muted-foreground hover:text-navy">Posts</Link>
          <Link to="/admin/submissions" activeProps={{ className: "text-navy font-semibold" }} className="text-muted-foreground hover:text-navy">Submissions</Link>
          <Link to="/admin/blog/new" className="rounded-md bg-navy px-3 py-1.5 text-primary-foreground text-xs">+ New Post</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
            className="text-muted-foreground hover:text-navy"
          >
            Sign out
          </button>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
