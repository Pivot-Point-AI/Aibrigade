import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostEditor } from "@/components/admin/PostEditor";

export default function NewPostPage() {
  return (
    <section className="pt-28 pb-20 min-h-screen">
      <div className="container-custom max-w-3xl">
        <AdminHeader title="New Post" subtitle="Write and publish a new article" />
        <div className="bg-surface border border-border rounded-2xl p-8">
          <PostEditor />
        </div>
      </div>
    </section>
  );
}
