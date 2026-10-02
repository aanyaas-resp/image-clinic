import type { MetadataRoute } from "next";
import { ACTIVE_BRANCHES } from "@/data/branches";

const SITE_URL = new URL("https://www.imageclinicindia.co/");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...ACTIVE_BRANCHES.map((branch) => ({
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
