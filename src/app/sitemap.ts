import type { MetadataRoute } from "next";
import { BRANCHES } from "@/data/branches";

const SITE_URL = "https://www.imageclinic.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.values(BRANCHES).map((branch) => ({
      url: `${SITE_URL}/${branch.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/legal`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}