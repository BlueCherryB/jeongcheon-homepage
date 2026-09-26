import { cache } from "react";

import {
  searchPublishedContent,
  type SanitySearchResult,
} from "@/lib/cms/search";
import {
  buildSearchPattern,
  getSearchCategoryValues,
  SEARCH_RESULTS_PER_PAGE,
} from "@/lib/search";
import {
  caseStudyCategoryLabels,
  type CaseStudyCategory,
} from "@/types/content/caseStudy";
import {
  legalArticleCategoryLabels,
  type LegalArticleCategory,
} from "@/types/content/legalArticle";
import type {
  SearchResponse,
  SearchResult,
  SearchResultContentType,
} from "@/types/content/search";

function optionalTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getContentTypeLabel(contentType: SearchResultContentType): SearchResult["contentTypeLabel"] {
  return contentType === "caseStudy" ? "수행 사례" : "법률 정보";
}

function getCategoryLabel(contentType: SearchResultContentType, category: string): string {
  if (contentType === "caseStudy") {
    return caseStudyCategoryLabels[category as CaseStudyCategory] ?? "수행 사례";
  }

  return legalArticleCategoryLabels[category as LegalArticleCategory] ?? "법률 정보";
}

function getHref(contentType: SearchResultContentType, slug: string): string {
  return contentType === "caseStudy" ? `/cases/${slug}` : `/legal-info/${slug}`;
}

function mapSearchResult(result: SanitySearchResult): SearchResult | null {
  const id = optionalTrimmedString(result._id);
  const title = optionalTrimmedString(result.title);
  const slug = optionalTrimmedString(result.slug);
  const category = optionalTrimmedString(result.category);
  const contentType = result._type;

  if (!id || !title || !slug || !category || !contentType) {
    return null;
  }

  return {
    id,
    contentType,
    contentTypeLabel: getContentTypeLabel(contentType),
    title,
    slug,
    categoryLabel: getCategoryLabel(contentType, category),
    excerpt: optionalTrimmedString(result.excerpt),
    publishedAt: optionalTrimmedString(result.publishedAt),
    href: getHref(contentType, slug),
  };
}

export const getSearchResults = cache(async (
  query: string,
  requestedPage: number,
): Promise<SearchResponse> => {
  const start = (requestedPage - 1) * SEARCH_RESULTS_PER_PAGE;
  const end = start + SEARCH_RESULTS_PER_PAGE;

  try {
    const response = await searchPublishedContent(
      buildSearchPattern(query),
      getSearchCategoryValues(query),
      start,
      end,
    );
    const totalCount = response.totalCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / SEARCH_RESULTS_PER_PAGE));
    return {
      query,
      results: response.results
        .map(mapSearchResult)
        .filter((result): result is SearchResult => Boolean(result)),
      totalCount,
      currentPage: requestedPage,
      totalPages,
    };
  } catch (error) {
    console.error(
      "Published content search failed.",
      error instanceof Error ? error.message : "Unknown error"
    );

    return {
      query,
      results: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }
});
