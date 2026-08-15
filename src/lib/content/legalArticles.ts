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

export async function getLegalArticles(): Promise<LegalArticleListItem[]> {
  try {
    const {getPublishedLegalArticles} = await getCmsLegalArticleApi();

    return mapSanityLegalArticleListItems(await getPublishedLegalArticles());
  } catch (error) {
    if (error instanceof LegalArticleMappingError) {
      throw error;
    }

    return [];
  }
}

export async function getLegalArticleBySlug(slug: string): Promise<LegalArticleDetail | null> {
  try {
    const {getPublishedLegalArticleBySlug} = await getCmsLegalArticleApi();

    return mapNullableSanityLegalArticleDetail(
      await getPublishedLegalArticleBySlug(slug),
    );
  } catch {
    return null;
  }
}

export async function getLegalArticleSlugs(): Promise<string[]> {
  try {
    const {getPublishedLegalArticleSlugs} = await getCmsLegalArticleApi();

    return mapSanityLegalArticleSlugs(await getPublishedLegalArticleSlugs());
  } catch (error) {
    if (error instanceof LegalArticleMappingError) {
      throw error;
    }

    return [];
  }
}
