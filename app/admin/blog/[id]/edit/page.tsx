import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <section className="pt-28 pb-20 min-h-screen">
      <div className="container-custom max-w-3xl">
        <AdminHeader title="Edit Post" subtitle={post.title} />
        <div className="bg-surface border border-border rounded-2xl p-8">
          <PostEditor post={post} />
        </div>
      </div>
    </section>
  );
}
