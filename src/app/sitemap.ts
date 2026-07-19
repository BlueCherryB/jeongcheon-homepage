import type { MetadataRoute } from "next";

import { practiceAreas } from "@/data/practice";
import { getCaseStudySlugs } from "@/lib/content/caseStudies";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const caseStudySlugs = await getCaseStudySlugs();
  const staticRoutes = ["", "/attorney", "/practice", "/cases"];
  const practiceRoutes = practiceAreas.map((area) => area.href);
  const caseRoutes = caseStudySlugs.map((slug) => `/cases/${slug}`);

  return [...staticRoutes, ...practiceRoutes, ...caseRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
