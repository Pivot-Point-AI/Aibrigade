import mongoose from "mongoose";
import connectDB from "../../../../lib/mongodb";
import Media from "../../../../models/Media";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return new Response("Not found", { status: 404 });
  await connectDB();
  const doc = await Media.findById(id).lean();
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(doc.data.buffer ? Buffer.from(doc.data.buffer) : doc.data, {
    headers: {
      "Content-Type": doc.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
