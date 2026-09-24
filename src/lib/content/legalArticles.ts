import { cache } from "react";

import {
  LegalArticleMappingError,
  mapNullableSanityLegalArticleDetail,
  mapSanityLegalArticleListItems,
  mapSanityLegalArticleSlugs,
} from "@/lib/content/legalArticleMappers";
import type {
  LegalArticleDetail,
  LegalArticleListItem,
} from "@/types/content/legalArticle";

async function getCmsLegalArticleApi() {
  return import("@/lib/cms/legalArticles");
}

export const getLegalArticles = cache(async (): Promise<LegalArticleListItem[]> => {
  try {
    const {getPublishedLegalArticles} = await getCmsLegalArticleApi();

    return mapSanityLegalArticleListItems(await getPublishedLegalArticles());
  } catch (error) {
    if (error instanceof LegalArticleMappingError) {
      throw error;
    }

    return [];
  }
});

export const getLegalArticleBySlug = cache(async (slug: string): Promise<LegalArticleDetail | null> => {
  try {
    const {getPublishedLegalArticleBySlug} = await getCmsLegalArticleApi();

    return mapNullableSanityLegalArticleDetail(
      await getPublishedLegalArticleBySlug(slug),
    );
  } catch {
    return null;
  }
});

export const getLegalArticleSlugs = cache(async (): Promise<string[]> => {
  try {
    const {getPublishedLegalArticleSlugs} = await getCmsLegalArticleApi();

    return mapSanityLegalArticleSlugs(await getPublishedLegalArticleSlugs());
  } catch (error) {
    if (error instanceof LegalArticleMappingError) {
      throw error;
    }

    return [];
  }
});
