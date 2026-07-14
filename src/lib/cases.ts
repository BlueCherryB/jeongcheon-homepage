import { caseStudies } from "@/data/cases";
import type { CaseStudy } from "@/data/cases";
import {
  caseStudyCategoryLabels,
  type CaseStudyCategory,
} from "@/types/content/caseStudy";

export const CASES_PER_PAGE = 10;

export type CaseFilterValue = "all" | CaseStudyCategory;

export type CaseCategoryFilter = {
  label: string;
  value: CaseFilterValue;
};

type CaseListItem = {
  categoryId: CaseStudyCategory;
  publishedAt?: string;
};

type PaginationInput = {
  category: CaseFilterValue;
  page: number;
};

const caseCategoryValues: CaseStudyCategory[] = ["criminal", "civil", "family"];

export const caseCategoryFilters: CaseCategoryFilter[] = [
  { label: "전체", value: "all" },
  ...caseCategoryValues.map((category) => ({
    label: caseStudyCategoryLabels[category],
    value: category,
  })),
];

export function parseCaseCategory(value: unknown): CaseFilterValue {
  if (typeof value !== "string") {
    return "all";
  }

  return caseCategoryValues.includes(value as CaseStudyCategory)
    ? (value as CaseStudyCategory)
    : "all";
}

export function parsePage(value: unknown): number {
  if (typeof value !== "string") {
    return 1;
  }

  const page = Number.parseInt(value, 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function sortCasesLatestFirst<T extends CaseListItem>(caseStudies: T[]): T[] {
  return [...caseStudies].sort(
    (first, second) =>
      new Date(second.publishedAt ?? "").getTime() -
      new Date(first.publishedAt ?? "").getTime(),
  );
}

export function filterCases<T extends CaseListItem>(
  caseStudies: T[],
  category: CaseFilterValue,
): T[] {
  if (category === "all") {
    return caseStudies;
  }

  return caseStudies.filter((caseStudy) => caseStudy.categoryId === category);
}

export function getPaginationState(totalCount: number, requestedPage: number) {
  const totalPages = Math.max(1, Math.ceil(totalCount / CASES_PER_PAGE));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  return {
    currentPage,
    totalPages,
    startIndex: (currentPage - 1) * CASES_PER_PAGE,
    endIndex: currentPage * CASES_PER_PAGE,
  };
}

export function buildCasesHref({ category, page }: PaginationInput): string {
  const searchParams = new URLSearchParams();

  if (category !== "all") {
    searchParams.set("category", category);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();

  return query ? `/cases?${query}` : "/cases";
}

export function getLatestCaseStudies(limit: number): CaseStudy[] {
  return sortCasesLatestFirst(caseStudies).slice(0, limit);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyIndex(slug: string): number {
  return sortCasesLatestFirst(caseStudies).findIndex(
    (caseStudy) => caseStudy.slug === slug,
  );
}

export function getPreviousCaseStudy(slug: string): CaseStudy | undefined {
  const sortedCases = sortCasesLatestFirst(caseStudies);
  const currentIndex = sortedCases.findIndex(
    (caseStudy) => caseStudy.slug === slug,
  );

  return currentIndex > 0 ? sortedCases[currentIndex - 1] : undefined;
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const sortedCases = sortCasesLatestFirst(caseStudies);
  const currentIndex = sortedCases.findIndex(
    (caseStudy) => caseStudy.slug === slug,
  );

  return currentIndex >= 0 && currentIndex < sortedCases.length - 1
    ? sortedCases[currentIndex + 1]
    : undefined;
}

export function getRelatedCaseStudies(caseStudy: CaseStudy): CaseStudy[] {
  return caseStudy.relatedCaseSlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((relatedCase): relatedCase is CaseStudy => Boolean(relatedCase));
}
