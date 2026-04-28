import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/new")({
  component: lazyRouteComponent(() => import("@/components/pages/AdminNewPostPage"), "AdminNewPostPage"),
});
