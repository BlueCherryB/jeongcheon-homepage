import { publishedSanityClient } from "@/lib/cms/client";
import { publishedContentSearchQuery } from "@/lib/cms/queries/search";

export type SanitySearchResult = {
  _id?: string;
  _type?: "caseStudy" | "legalArticle";
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
};

type SanitySearchResponse = {
  totalCount?: number;
  results?: SanitySearchResult[];
};

export type PublishedContentSearchResponse = {
  totalCount: number;
  results: SanitySearchResult[];
};

export async function searchPublishedContent(
  searchPattern: string,
  categoryValues: string[],
  start: number,
  end: number,
): Promise<PublishedContentSearchResponse> {
  const response = await publishedSanityClient.fetch<SanitySearchResponse>(
    publishedContentSearchQuery,
    { searchPattern, categoryValues, start, end },
  );

  return {
    totalCount:
      typeof response?.totalCount === "number" && response.totalCount >= 0
        ? response.totalCount
        : 0,
    results: Array.isArray(response?.results) ? response.results : [],
  };
}
