import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Post from "../../../../models/Post";
import { getSession, sameOrigin } from "../../../../lib/auth";
import { validatePost } from "../../../../lib/validate";
import { getAllPosts, serialize } from "../../../../lib/posts";

export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ error: "Please sign in." }, { status: 401 });

export async function GET() {
  if (!(await getSession())) return unauthorized();
  return NextResponse.json({ posts: await getAllPosts() });
}

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  if (!(await getSession())) return unauthorized();

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { data, error } = validatePost(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  await connectDB();
  if (await Post.exists({ slug: data.slug })) {
    return NextResponse.json({ error: `The slug "${data.slug}" is already used by another post.` }, { status: 409 });
  }

  const post = await Post.create({
    ...data,
    publishedAt: data.status === "published" ? new Date() : null,
  });
  return NextResponse.json({ post: serialize(post.toObject()) }, { status: 201 });
}
