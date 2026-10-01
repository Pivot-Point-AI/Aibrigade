import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE = "aib_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error("AUTH_SECRET must be set to a random string of 32+ characters.");
  }
  return new TextEncoder().encode(s);
}

// Constant-time comparison (hashing first makes the buffers equal length).
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function credentialsConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function verifyCredentials(email, password) {
  const emailOk = safeEqual(
    String(email || "").trim().toLowerCase(),
    String(process.env.ADMIN_EMAIL || "").trim().toLowerCase()
  );
  const passOk = safeEqual(password || "", process.env.ADMIN_PASSWORD || "");
  return emailOk && passOk; // both always evaluated
}

export async function createSession(email) {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());

  const secure =
    process.env.AUTH_COOKIE_SECURE != null
      ? process.env.AUTH_COOKIE_SECURE === "true"
      : process.env.NODE_ENV === "production";

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin" ? { email: payload.sub } : null;
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

// Blocks cross-site form posts on top of SameSite=Lax.
export function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Minimal in-memory brute-force guard: 5 failures / 15 minutes per IP.
const attempts = (globalThis._aibLoginAttempts ||= new Map());
const WINDOW = 15 * 60 * 1000;
const LIMIT = 5;

export function isLimited(ip) {
  const rec = attempts.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW) {
    attempts.delete(ip);
    return false;
  }
  return rec.count >= LIMIT;
}
export function recordFailure(ip) {
  const rec = attempts.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW) attempts.set(ip, { count: 1, first: Date.now() });
  else rec.count += 1;
}
export function clearFailures(ip) {
  attempts.delete(ip);
}
