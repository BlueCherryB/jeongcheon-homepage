export type SearchResultContentType = "caseStudy" | "legalArticle";

export type SearchResult = {
  id: string;
  contentType: SearchResultContentType;
  contentTypeLabel: "수행 사례" | "법률 정보";
  title: string;
  slug: string;
  categoryLabel: string;
  excerpt?: string;
  publishedAt?: string;
  href: string;
};

export type SearchResponse = {
  query: string;
  results: SearchResult[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};
