import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/careers`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
  ].map((entry) => ({ ...entry, lastModified: new Date() }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
