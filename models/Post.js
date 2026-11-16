import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Earlier slugs of this post. A post whose slug was changed keeps them so
    // the old URL can redirect to the new one instead of becoming a 404.
    previousSlugs: { type: [String], default: [], index: true },
    excerpt: { type: String, trim: true, maxlength: 320, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, trim: true, default: "" },
    tags: { type: [String], default: [] },
    author: { type: String, trim: true, default: "AIBrigade Team" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

PostSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
