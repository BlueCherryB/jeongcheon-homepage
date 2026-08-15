import type { MetadataRoute } from "next";

import { practiceAreas } from "@/data/practice";
import { getCaseStudySlugs } from "@/lib/content/caseStudies";
import { getLegalArticleSlugs } from "@/lib/content/legalArticles";
import { getProductionSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getProductionSiteUrl();
  const caseStudySlugs = await getCaseStudySlugs();
  const legalArticleSlugs = await getLegalArticleSlugs();
  const staticRoutes = ["", "/attorney", "/practice", "/cases", "/legal-info"];
  const practiceRoutes = practiceAreas.map((area) => area.href);
  const caseRoutes = caseStudySlugs.map((slug) => `/cases/${slug}`);
  const legalArticleRoutes = legalArticleSlugs.map((slug) => `/legal-info/${slug}`);

  return [...staticRoutes, ...practiceRoutes, ...caseRoutes, ...legalArticleRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
