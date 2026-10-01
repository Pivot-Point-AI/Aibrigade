import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Media from "../../../../models/Media";
import { getSession, sameOrigin } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const fail = (error, status) => NextResponse.json({ error }, { status });

export async function POST(request) {
  if (!sameOrigin(request)) return fail("Forbidden.", 403);
  if (!(await getSession())) return fail("Please sign in.", 401);

  let file;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return fail("Invalid request.", 400);
  }
  if (!file || typeof file === "string") return fail("No image was attached.", 400);
  if (!TYPES.includes(file.type)) return fail("Use a JPG, PNG, WebP or GIF image.", 400);
  if (file.size > MAX_BYTES) return fail("Image is larger than 5 MB.", 400);

  await connectDB();
  const doc = await Media.create({
    data: Buffer.from(await file.arrayBuffer()),
    contentType: file.type,
    name: String(file.name || "").slice(0, 200),
    size: file.size,
  });
  return NextResponse.json({ url: `/api/media/${doc._id}` }, { status: 201 });
}
