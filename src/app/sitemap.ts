import type { MetadataRoute } from "next";

const BASE_URL = "https://novuslabshq.com";
const ROUTES = ["", "/services", "/projects", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
