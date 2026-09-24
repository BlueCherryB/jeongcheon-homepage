import {unstable_cache} from "next/cache";

import {cmsCacheTags} from "@/lib/cms/cacheTags";
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

const fetchPublishedLegalArticles = unstable_cache(async (): Promise<SanityLegalArticleListItem[]> => {
  const result = await publishedSanityClient.fetch<SanityLegalArticleListItem[]>(
    publishedLegalArticlesQuery,
  );

  return Array.isArray(result) ? result : [];
}, ["published-legal-articles"], {revalidate: 300, tags: [cmsCacheTags.legalArticles]});

export async function getPublishedLegalArticles(): Promise<SanityLegalArticleListItem[]> {
  return fetchPublishedLegalArticles();
}

const fetchPublishedLegalArticleBySlug = unstable_cache(async (
  slug: string,
): Promise<SanityLegalArticleDetail | null> => {
  assertValidLegalArticleSlug(slug);

  return publishedSanityClient.fetch<SanityLegalArticleDetail | null>(
    publishedLegalArticleBySlugQuery,
    {slug},
  );
}, ["published-legal-article-by-slug"], {revalidate: 300, tags: [cmsCacheTags.legalArticles]});

export async function getPublishedLegalArticleBySlug(
  slug: string,
): Promise<SanityLegalArticleDetail | null> {
  return fetchPublishedLegalArticleBySlug(slug);
}

const fetchPublishedLegalArticleSlugs = unstable_cache(async (): Promise<SanityLegalArticleSlug[]> => {
  const result = await publishedSanityClient.fetch<SanityLegalArticleSlug[]>(
    publishedLegalArticleSlugsQuery,
  );

  return Array.isArray(result) ? result : [];
}, ["published-legal-article-slugs"], {revalidate: 300, tags: [cmsCacheTags.legalArticles]});

export async function getPublishedLegalArticleSlugs(): Promise<SanityLegalArticleSlug[]> {
  return fetchPublishedLegalArticleSlugs();
}
