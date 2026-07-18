import {
  CaseStudyMappingError,
  mapNullableSanityCaseStudyDetail,
  mapSanityCaseStudyListItems,
  mapSanityCaseStudySlugs,
} from "@/lib/content/caseStudyMappers";
import {
  getLocalCaseStudies,
  getLocalCaseStudyBySlug,
  getLocalCaseStudySlugs,
  getLocalFeaturedCaseStudies,
} from "@/lib/content/localCaseStudies";
import type {
  CaseStudyDetail,
  CaseStudyListItem,
} from "@/types/content/caseStudy";

async function getCmsCaseStudyApi() {
  return import("@/lib/cms/caseStudies");
}

function uniqueSlugs(slugs: string[]): string[] {
  return Array.from(new Set(slugs));
}

export async function getCaseStudies(): Promise<CaseStudyListItem[]> {
  try {
    const { getPublishedCaseStudies } = await getCmsCaseStudyApi();
    const caseStudies = mapSanityCaseStudyListItems(
      await getPublishedCaseStudies(),
    );

    return caseStudies.length > 0 ? caseStudies : getLocalCaseStudies();
  } catch (error) {
    if (error instanceof CaseStudyMappingError) {
      throw error;
    }

    return getLocalCaseStudies();
  }
}

export async function getFeaturedCaseStudies(): Promise<CaseStudyListItem[]> {
  try {
    const { getFeaturedCaseStudies: getFeaturedSanityCaseStudies } =
      await getCmsCaseStudyApi();
    const caseStudies = mapSanityCaseStudyListItems(
      await getFeaturedSanityCaseStudies(),
    );

    return caseStudies;
  } catch (error) {
    if (error instanceof CaseStudyMappingError) {
      throw error;
    }

    return getLocalFeaturedCaseStudies();
  }
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDetail | null> {
  try {
    const { getPublishedCaseStudyBySlug } = await getCmsCaseStudyApi();
    const caseStudy = mapNullableSanityCaseStudyDetail(
      await getPublishedCaseStudyBySlug(slug),
    );

    return caseStudy ?? getLocalCaseStudyBySlug(slug);
  } catch (error) {
    if (error instanceof CaseStudyMappingError) {
      return getLocalCaseStudyBySlug(slug);
    }

    return getLocalCaseStudyBySlug(slug);
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const localSlugs = getLocalCaseStudySlugs();

  try {
    const { getPublishedCaseStudySlugs } = await getCmsCaseStudyApi();
    const sanitySlugs = mapSanityCaseStudySlugs(
      await getPublishedCaseStudySlugs(),
    );

    return uniqueSlugs([...sanitySlugs, ...localSlugs]);
  } catch (error) {
    if (error instanceof CaseStudyMappingError) {
      throw error;
    }

    return localSlugs;
  }
}
