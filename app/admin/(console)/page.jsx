import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";
import PostsManager from "../../../components/admin/PostsManager";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  let posts = [];
  let dbError = null;
  try {
    posts = await getAllPosts();
  } catch (e) {
    dbError = e.message;
  }

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-h1">Posts</h1>
          <p className="adm-lead">Write, publish and retire the articles on your blog.</p>
        </div>
        <Link href="/admin/posts/new" className="adm-btn adm-btn--primary">+ New post</Link>
      </div>

      {dbError ? (
        <div className="adm-alert adm-alert--error" role="alert">
          <strong>Can&apos;t reach the database.</strong> {dbError}
          <br />
          Check that <code>MONGODB_URI</code> is set in your environment and the cluster allows this server&apos;s IP.
        </div>
      ) : (
        <PostsManager initialPosts={posts} />
      )}
    </>
  );
}
