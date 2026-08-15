import {publishedSanityClient} from "@/lib/cms/client";
import {
  publishedLegalArticleBySlugQuery,
  publishedLegalArticlesQuery,
  publishedLegalArticleSlugsQuery,
} from "@/lib/cms/queries/legalArticles";
import type {
  SanityLegalArticleDetail,
  SanityLegalArticleListItem,
  SanityLegalArticleSlug,
} from "@/lib/cms/types/legalArticle";

const legalArticleSlugPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

function assertValidLegalArticleSlug(slug: string): void {
  if (!legalArticleSlugPattern.test(slug)) {
    throw new TypeError(
      "Legal article slug must use lowercase letters, numbers, hyphens, and underscores only.",
    );
  }
}

export async function getPublishedLegalArticles(): Promise<SanityLegalArticleListItem[]> {
  const result = await publishedSanityClient.fetch<SanityLegalArticleListItem[]>(
    publishedLegalArticlesQuery,
  );

  return Array.isArray(result) ? result : [];
}

export async function getPublishedLegalArticleBySlug(
  slug: string,
): Promise<SanityLegalArticleDetail | null> {
  assertValidLegalArticleSlug(slug);

  return publishedSanityClient.fetch<SanityLegalArticleDetail | null>(
    publishedLegalArticleBySlugQuery,
    {slug},
  );
}

export async function getPublishedLegalArticleSlugs(): Promise<SanityLegalArticleSlug[]> {
  const result = await publishedSanityClient.fetch<SanityLegalArticleSlug[]>(
    publishedLegalArticleSlugsQuery,
  );

  return Array.isArray(result) ? result : [];
}
