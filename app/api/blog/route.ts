import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse, BlogPost } from "@/types";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createPost, getAllPosts, getPublishedPosts, type BlogPostInput } from "@/lib/blog";

function isAdmin(req: NextRequest): Promise<boolean> {
  return verifySessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  const posts = (await isAdmin(req)) ? await getAllPosts() : await getPublishedPosts();
  return NextResponse.json<ApiResponse<BlogPost[]>>({ success: true, data: posts });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Partial<BlogPostInput>;
  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Title and content are required" },
      { status: 400 }
    );
  }

  const post = await createPost({
    title: body.title.trim(),
    excerpt: body.excerpt?.trim() ?? "",
    content: body.content,
    category: body.category?.trim() || "General",
    tags: Array.isArray(body.tags) ? body.tags.filter(Boolean) : [],
    coverImage: body.coverImage?.trim() || undefined,
    author: body.author?.trim() || "AIBrigade Team",
    status: body.status === "published" ? "published" : "draft",
  });

  return NextResponse.json<ApiResponse<BlogPost>>({ success: true, data: post }, { status: 201 });
}
