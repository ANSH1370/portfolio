import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // Static long-form write-up served from public/fine-tuning-field-notes/.
      url: `${site.url}/fine-tuning-field-notes`,
      lastModified: new Date("2026-09-21"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
