import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { getPostById } from "../../../../../lib/posts";
import PostEditor from "../../../../../components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  const post = await getPostById(id);
  if (!post) notFound();

  return <PostEditor post={post} />;
}
