import {
  legalArticleCategoryLabels,
  type LegalArticleCategory,
} from "@/types/content/legalArticle";

export type LegalArticleFilterValue = "all" | LegalArticleCategory;

const legalArticleCategoryValues = Object.keys(
  legalArticleCategoryLabels,
) as LegalArticleCategory[];

export const legalArticleCategoryFilters = [
  {label: "전체", value: "all"},
  ...legalArticleCategoryValues.map((value) => ({
    label: legalArticleCategoryLabels[value],
    value,
  })),
] as const;

export function parseLegalArticleCategory(value: unknown): LegalArticleFilterValue {
  return typeof value === "string" &&
    legalArticleCategoryValues.includes(value as LegalArticleCategory)
    ? (value as LegalArticleCategory)
    : "all";
}

export function buildLegalInfoHref(category: LegalArticleFilterValue): string {
  return category === "all" ? "/legal-info" : `/legal-info?category=${category}`;
}

export function filterLegalArticles<T extends {category: LegalArticleCategory}>(
  articles: T[],
  category: LegalArticleFilterValue,
): T[] {
  return category === "all"
    ? articles
    : articles.filter((article) => article.category === category);
}
