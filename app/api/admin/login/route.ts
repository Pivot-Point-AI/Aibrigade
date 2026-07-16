import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types";
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (typeof password !== "string" || !verifyAdminPassword(password)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    const res = NextResponse.json<ApiResponse<null>>({ success: true });
    res.cookies.set(ADMIN_SESSION_COOKIE, await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Server not configured" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json<ApiResponse<null>>({ success: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
