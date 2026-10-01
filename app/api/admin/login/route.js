import { NextResponse } from "next/server";
import {
  createSession, verifyCredentials, credentialsConfigured,
  sameOrigin, isLimited, recordFailure, clearFailures,
} from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  if (!credentialsConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in your environment." },
      { status: 500 }
    );
  }

  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyCredentials(body.email, body.password)) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  clearFailures(ip);
  await createSession(String(body.email).trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
