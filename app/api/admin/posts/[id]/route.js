import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../../../lib/mongodb";
import Post from "../../../../../models/Post";
import { getSession, sameOrigin } from "../../../../../lib/auth";
import { validatePost } from "../../../../../lib/validate";
import { serialize } from "../../../../../lib/posts";

export const dynamic = "force-dynamic";

const fail = (error, status) => NextResponse.json({ error }, { status });

async function guard(request, params, { mutating }) {
  if (mutating && !sameOrigin(request)) return { res: fail("Forbidden.", 403) };
  if (!(await getSession())) return { res: fail("Please sign in.", 401) };
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return { res: fail("Post not found.", 404) };
  await connectDB();
  return { id };
}

export async function GET(request, { params }) {
  const g = await guard(request, params, { mutating: false });
  if (g.res) return g.res;
  const doc = await Post.findById(g.id).lean();
  return doc ? NextResponse.json({ post: serialize(doc) }) : fail("Post not found.", 404);
}

export async function PUT(request, { params }) {
  const g = await guard(request, params, { mutating: true });
  if (g.res) return g.res;

  let body;
  try { body = await request.json(); } catch { return fail("Invalid request.", 400); }

  const doc = await Post.findById(g.id);
  if (!doc) return fail("Post not found.", 404);

  const { data, error } = validatePost(body, doc.toObject());
  if (error) return fail(error, 400);

  if (data.slug !== doc.slug && (await Post.exists({ slug: data.slug, _id: { $ne: doc._id } }))) {
    return fail(`The slug "${data.slug}" is already used by another post.`, 409);
  }

  Object.assign(doc, data);
  if (data.status === "published" && !doc.publishedAt) doc.publishedAt = new Date();
  await doc.save();
  return NextResponse.json({ post: serialize(doc.toObject()) });
}

export async function DELETE(request, { params }) {
  const g = await guard(request, params, { mutating: true });
  if (g.res) return g.res;
  const res = await Post.findByIdAndDelete(g.id);
  return res ? NextResponse.json({ ok: true }) : fail("Post not found.", 404);
}
