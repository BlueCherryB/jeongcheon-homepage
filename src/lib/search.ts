export const SEARCH_RESULTS_PER_PAGE = 10;
const maximumSearchQueryLength = 80;

const categorySearchValues = {
  형사: "criminal",
  민사: "civil",
  가사: "family",
  이혼: "family",
  기타: "general",
  일반: "general",
} as const;

export function normalizeSearchQuery(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maximumSearchQueryLength);
}

export function parseSearchPage(value: unknown): number {
  if (typeof value !== "string") {
    return 1;
  }

  const page = Number.parseInt(value, 10);

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function buildSearchHref(query: string, page = 1): string {
  const searchParams = new URLSearchParams({q: query});

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  return `/search?${searchParams.toString()}`;
}

export function buildSearchPattern(query: string): string {
  return `${query}*`;
}

export function getSearchCategoryValues(query: string): string[] {
  return Object.entries(categorySearchValues)
    .filter(([label]) => query.includes(label))
    .map(([, value]) => value);
}

export function getSearchPaginationPages(
  currentPage: number,
  totalPages: number,
): number[] {
  const firstPage = Math.max(1, Math.min(currentPage - 3, totalPages - 6));
  const lastPage = Math.min(totalPages, firstPage + 6);

  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );
}
