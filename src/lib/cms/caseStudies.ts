import { unstable_cache } from "next/cache";

import { cmsCacheTags } from "@/lib/cms/cacheTags";
import { publishedSanityClient } from "@/lib/cms/client";
import {
  featuredCaseStudiesQuery,
  publishedCaseStudiesQuery,
  publishedCaseStudyBySlugQuery,
  publishedCaseStudySlugsQuery,
} from "@/lib/cms/queries/caseStudies";
import type {
  SanityCaseStudyDetail,
  SanityCaseStudyListItem,
  SanityCaseStudySlug,
} from "@/lib/cms/types/caseStudy";

const caseStudySlugPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

export function assertValidCaseStudySlug(slug: string): void {
  if (!caseStudySlugPattern.test(slug)) {
    throw new TypeError(
      "Case Study slug must use lowercase letters, numbers, hyphens, and underscores only.",
    );
  }
}

const fetchPublishedCaseStudies = unstable_cache(async (): Promise<
  SanityCaseStudyListItem[]
> => {
  const result = await publishedSanityClient.fetch<SanityCaseStudyListItem[]>(
    publishedCaseStudiesQuery,
  );

  return Array.isArray(result) ? result : [];
}, ["published-case-studies"], { revalidate: 300, tags: [cmsCacheTags.caseStudies] });

export async function getPublishedCaseStudies(): Promise<SanityCaseStudyListItem[]> {
  return fetchPublishedCaseStudies();
}

const fetchFeaturedCaseStudies = unstable_cache(async (): Promise<
  SanityCaseStudyListItem[]
> => {
  const result = await publishedSanityClient.fetch<SanityCaseStudyListItem[]>(
    featuredCaseStudiesQuery,
  );

  return Array.isArray(result) ? result : [];
}, ["featured-case-studies"], { revalidate: 300, tags: [cmsCacheTags.caseStudies] });

export async function getFeaturedCaseStudies(): Promise<SanityCaseStudyListItem[]> {
  return fetchFeaturedCaseStudies();
}

const fetchPublishedCaseStudyBySlug = unstable_cache(async (
  slug: string,
): Promise<SanityCaseStudyDetail | null> => {
  assertValidCaseStudySlug(slug);

  return publishedSanityClient.fetch<SanityCaseStudyDetail | null>(
    publishedCaseStudyBySlugQuery,
    { slug },
  );
}, ["published-case-study-by-slug"], { revalidate: 300, tags: [cmsCacheTags.caseStudies] });

export async function getPublishedCaseStudyBySlug(
  slug: string,
): Promise<SanityCaseStudyDetail | null> {
  return fetchPublishedCaseStudyBySlug(slug);
}

const fetchPublishedCaseStudySlugs = unstable_cache(async (): Promise<
  SanityCaseStudySlug[]
> => {
  const result = await publishedSanityClient.fetch<SanityCaseStudySlug[]>(
    publishedCaseStudySlugsQuery,
  );

  return Array.isArray(result) ? result : [];
}, ["published-case-study-slugs"], { revalidate: 300, tags: [cmsCacheTags.caseStudies] });

export async function getPublishedCaseStudySlugs(): Promise<SanityCaseStudySlug[]> {
  return fetchPublishedCaseStudySlugs();
}
