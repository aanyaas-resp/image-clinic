import type { MetadataRoute } from "next";
import { BRANCHES } from "@/data/branches";

// Keep sitemap URLs on the same canonical host used by metadata and robots.
const SITE_URL = new URL("https://www.imageclinic.in");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.values(BRANCHES).map((branch) => ({
      url: new URL(`/${branch.slug}`, SITE_URL).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: new URL("/legal", SITE_URL).toString(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
