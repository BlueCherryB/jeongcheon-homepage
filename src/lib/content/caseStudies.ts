import {
  getFeaturedCaseStudies as getFeaturedSanityCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
  getPublishedCaseStudySlugs,
} from "@/lib/cms/caseStudies";
import {
  mapNullableSanityCaseStudyDetail,
  mapSanityCaseStudyListItems,
  mapSanityCaseStudySlugs,
} from "@/lib/content/caseStudyMappers";
import type {
  CaseStudyDetail,
  CaseStudyListItem,
} from "@/types/content/caseStudy";

export async function getCaseStudies(): Promise<CaseStudyListItem[]> {
  const caseStudies = await getPublishedCaseStudies();

  return mapSanityCaseStudyListItems(caseStudies);
}

export async function getFeaturedCaseStudies(): Promise<CaseStudyListItem[]> {
  const caseStudies = await getFeaturedSanityCaseStudies();

  return mapSanityCaseStudyListItems(caseStudies);
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDetail | null> {
  const caseStudy = await getPublishedCaseStudyBySlug(slug);

  return mapNullableSanityCaseStudyDetail(caseStudy);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const slugs = await getPublishedCaseStudySlugs();

  return mapSanityCaseStudySlugs(slugs);
}
