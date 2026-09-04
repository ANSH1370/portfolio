import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    // Demo assistants for prospects/clients live under /demo/<slug> and are
    // never meant to be indexed under this domain.
    rules: { userAgent: "*", allow: "/", disallow: "/demo/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
