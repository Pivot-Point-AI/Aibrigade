import { NextRequest, NextResponse } from "next/server";
import projectsData from "@/data/projects.json";
import type { Project, ApiResponse } from "@/types";

const projects = projectsData as Project[];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const industry = searchParams.get("industry");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  let filtered = [...projects];

  if (industry) {
    filtered = filtered.filter((p) => p.industry === industry);
  }

  if (featured === "true") {
    filtered = filtered.filter((p) => p.featured);
  }

  const paginated = filtered.slice(offset, offset + limit);

  return NextResponse.json<ApiResponse<{ projects: Project[]; total: number; hasMore: boolean }>>(
    {
      success: true,
      data: {
        projects: paginated,
        total: filtered.length,
        hasMore: offset + limit < filtered.length,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
