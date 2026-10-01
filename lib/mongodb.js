import mongoose from "mongoose";

// One shared connection across hot reloads (dev) and warm lambdas/containers (prod).
const cache = (globalThis._aibMongoose ||= { conn: null, promise: null });

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to your .env file.");

  if (cache.conn) return cache.conn;
  cache.promise ||= mongoose.connect(uri, { bufferCommands: false });

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
