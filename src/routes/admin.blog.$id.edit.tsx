import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/$id/edit")({
  component: lazyRouteComponent(() => import("@/components/pages/AdminEditPostPage"), "AdminEditPostPage"),
});
