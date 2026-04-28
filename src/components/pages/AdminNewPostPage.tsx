import { PostEditor } from "@/components/admin/PostEditor";

export function AdminNewPostPage() {
  return (
    <div>
      <h2 className="text-xl font-serif mb-6">New Blog Post</h2>
      <PostEditor />
    </div>
  );
}