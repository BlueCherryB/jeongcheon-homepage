import { caseStudies as localCaseStudies } from "@/data/cases";
import type { CaseStudy as LocalCaseStudy } from "@/data/cases";
import { CaseStudyMappingError } from "@/lib/content/caseStudyMappers";
import {
  caseStudyCategoryLabels,
  type CaseStudyCategory,
  type CaseStudyDetail,
  type CaseStudyListItem,
  type CaseStudyPortableText,
  type CaseStudyPortableTextBlock,
} from "@/types/content/caseStudy";

const caseStudyCategories = ["criminal", "civil", "family"] as const;
const localFeaturedFallbackLimit = 5;

function isCaseStudyCategory(value: unknown): value is CaseStudyCategory {
  return caseStudyCategories.includes(value as CaseStudyCategory);
}

function requireTrimmedString(fieldName: string, value: unknown): string {
  if (typeof value !== "string") {
    throw new CaseStudyMappingError(`Local Case Study ${fieldName} is required.`);
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new CaseStudyMappingError(
      `Local Case Study ${fieldName} must not be empty.`,
    );
  }

  return trimmedValue;
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function mapPortableText(
  sectionName: string,
  paragraphs: unknown,
): CaseStudyPortableText {
  return mapStringArray(paragraphs).map(
    (paragraph, index): CaseStudyPortableTextBlock => ({
      _key: `local-${sectionName}-${index}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `local-${sectionName}-${index}-span`,
          _type: "span",
          marks: [],
          text: paragraph,
        },
      ],
      markDefs: [],
    }),
  );
}

function sortLatestFirst<T extends { publishedAt?: string }>(caseStudies: T[]): T[] {
  return [...caseStudies].sort(
    (first, second) =>
      new Date(second.publishedAt ?? "").getTime() -
      new Date(first.publishedAt ?? "").getTime(),
  );
}

function isLocalCaseStudyRecord(value: unknown): value is Partial<LocalCaseStudy> {
  return Boolean(value) && typeof value === "object";
}

export function mapLocalCaseStudy(
  caseStudy: Partial<LocalCaseStudy>,
): CaseStudyDetail {
  const slug = requireTrimmedString("slug", caseStudy.slug);
  const category = caseStudy.categoryId;

  if (!isCaseStudyCategory(category)) {
    throw new CaseStudyMappingError("Local Case Study category is invalid.");
  }

  return {
    id: `local-${slug}`,
    title: requireTrimmedString("title", caseStudy.title),
    slug,
    category,
    categoryId: category,
    categoryLabel: caseStudyCategoryLabels[category],
    result: requireTrimmedString("result", caseStudy.result),
    resultDetail: requireTrimmedString("resultDetail", caseStudy.resultDetail),
    summary: requireTrimmedString("summary", caseStudy.summary),
    publishedAt: requireTrimmedString("publishedAt", caseStudy.publishedAt),
    displayDate: requireTrimmedString("displayDate", caseStudy.displayDate),
    featured: caseStudy.featured === true,
    overview: mapPortableText(`${slug}-overview`, caseStudy.overview),
    issues: mapPortableText(`${slug}-issues`, caseStudy.issues),
    response: mapPortableText(`${slug}-response`, caseStudy.strategy),
    outcome: mapPortableText(`${slug}-outcome`, caseStudy.outcome),
    keywords: mapStringArray(caseStudy.keywords),
    relatedPracticeIds: mapStringArray(caseStudy.relatedPracticeIds),
    relatedCaseSlugs: mapStringArray(caseStudy.relatedCaseSlugs),
    seo: {
      keywords: mapStringArray(caseStudy.keywords),
      noIndex: false,
    },
  };
}

export function mapLocalCaseStudies(
  caseStudies: readonly unknown[] = localCaseStudies,
): CaseStudyDetail[] {
  return caseStudies.reduce<CaseStudyDetail[]>((mappedCaseStudies, caseStudy) => {
    if (!isLocalCaseStudyRecord(caseStudy)) {
      return mappedCaseStudies;
    }

    try {
      mappedCaseStudies.push(mapLocalCaseStudy(caseStudy));
    } catch (error) {
      if (!(error instanceof CaseStudyMappingError)) {
        throw error;
      }
    }

    return mappedCaseStudies;
  }, []);
}

export function getLocalCaseStudies(): CaseStudyListItem[] {
  return sortLatestFirst(mapLocalCaseStudies());
}

export function getLocalFeaturedCaseStudies(): CaseStudyListItem[] {
  const sortedCaseStudies = getLocalCaseStudies();
  const featuredCaseStudies = sortedCaseStudies.filter(
    (caseStudy) => caseStudy.featured,
  );
  const featuredSlugs = new Set(
    featuredCaseStudies.map((caseStudy) => caseStudy.slug),
  );
  const latestNonFeaturedCaseStudies = sortedCaseStudies.filter(
    (caseStudy) => !featuredSlugs.has(caseStudy.slug),
  );

  return [...featuredCaseStudies, ...latestNonFeaturedCaseStudies].slice(
    0,
    localFeaturedFallbackLimit,
  );
}

export function getLocalCaseStudyBySlug(slug: string): CaseStudyDetail | null {
  return (
    mapLocalCaseStudies().find((caseStudy) => caseStudy.slug === slug) ?? null
  );
}

export function getLocalCaseStudySlugs(): string[] {
  return mapLocalCaseStudies()
    .map((caseStudy) => caseStudy.slug)
    .sort((first, second) => first.localeCompare(second));
}
