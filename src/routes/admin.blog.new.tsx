import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/blog/new")({
  component: NewPost,
});

function NewPost() {
  return (
    <div>
      <h2 className="text-xl font-serif mb-6">New Blog Post</h2>
      <PostEditor />
    </div>
  );
}
