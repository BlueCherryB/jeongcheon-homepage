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

const caseStudySlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function assertValidCaseStudySlug(slug: string): void {
  if (!caseStudySlugPattern.test(slug)) {
    throw new TypeError(
      "Case Study slug must use lowercase letters, numbers, and single hyphens only.",
    );
  }
}

export async function getPublishedCaseStudies(): Promise<
  SanityCaseStudyListItem[]
> {
  const result = await publishedSanityClient.fetch<SanityCaseStudyListItem[]>(
    publishedCaseStudiesQuery,
  );

  return Array.isArray(result) ? result : [];
}

export async function getFeaturedCaseStudies(): Promise<
  SanityCaseStudyListItem[]
> {
  const result = await publishedSanityClient.fetch<SanityCaseStudyListItem[]>(
    featuredCaseStudiesQuery,
  );

  return Array.isArray(result) ? result : [];
}

export async function getPublishedCaseStudyBySlug(
  slug: string,
): Promise<SanityCaseStudyDetail | null> {
  assertValidCaseStudySlug(slug);

  return publishedSanityClient.fetch<SanityCaseStudyDetail | null>(
    publishedCaseStudyBySlugQuery,
    { slug },
  );
}

export async function getPublishedCaseStudySlugs(): Promise<
  SanityCaseStudySlug[]
> {
  const result = await publishedSanityClient.fetch<SanityCaseStudySlug[]>(
    publishedCaseStudySlugsQuery,
  );

  return Array.isArray(result) ? result : [];
}
