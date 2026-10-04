import type { MetadataRoute } from "next";
import { projectOrder } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://rahuljana.dev", lastModified: new Date() },
    ...projectOrder.map((slug) => ({
      url: `https://rahuljana.dev/work/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
