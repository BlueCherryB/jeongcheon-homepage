import type {
  SanityContentImage,
  SanityImageCrop,
  SanityImageHotspot,
  SanityPortableTextBlock,
  SanitySeoFields,
} from "@/lib/cms/types/caseStudy";
import type {
  SanityLegalArticleCategory,
  SanityLegalArticleDetail,
  SanityLegalArticleListItem,
  SanityLegalArticleSlug,
} from "@/lib/cms/types/legalArticle";
import {
  legalArticleCategoryLabels,
  type LegalArticleCategory,
  type LegalArticleDetail,
  type LegalArticleListItem,
} from "@/types/content/legalArticle";
import type {
  CaseStudyImage,
  CaseStudyImageCrop,
  CaseStudyImageHotspot,
  CaseStudyPortableText,
  CaseStudyPortableTextBlock,
  CaseStudySeo,
} from "@/types/content/caseStudy";

const legalArticleCategories = ["criminal", "civil", "family", "general"] as const;
const defaultCoverImageAlt = "법률 정보 표지 이미지";
const generatedExcerptMaxLength = 180;

export class LegalArticleMappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LegalArticleMappingError";
  }
}

function requireTrimmedString(fieldName: string, value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new LegalArticleMappingError(`Legal article ${fieldName} is required.`);
  }

  return value.trim();
}

function optionalTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getFirstPortableTextParagraph(
  blocks: SanityPortableTextBlock[] | undefined,
): string | undefined {
  if (!Array.isArray(blocks)) {
    return undefined;
  }

  for (const block of blocks) {
    if (!block || block._type !== "block" || !Array.isArray(block.children)) {
      continue;
    }

    const text = block.children
      .map((child) => {
        if (!child || typeof child !== "object" || !("text" in child)) {
          return "";
        }

        return typeof child.text === "string" ? child.text : "";
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    if (text) {
      return text;
    }
  }

  return undefined;
}

function truncateGeneratedExcerpt(value: string): string {
  if (value.length <= generatedExcerptMaxLength) {
    return value;
  }

  const candidate = value.slice(0, generatedExcerptMaxLength + 1);
  const lastWhitespace = candidate.lastIndexOf(" ");
  const endIndex =
    lastWhitespace >= generatedExcerptMaxLength * 0.65
      ? lastWhitespace
      : generatedExcerptMaxLength;

  return `${value.slice(0, endIndex).trimEnd()}...`;
}

function deriveExcerpt(article: SanityLegalArticleListItem): string {
  const excerpt =
    optionalTrimmedString(article.excerpt) ??
    getFirstPortableTextParagraph(article.body);

  if (!excerpt) {
    throw new LegalArticleMappingError(
      "Legal article excerpt could not be derived from the body.",
    );
  }

  return optionalTrimmedString(article.excerpt)
    ? excerpt
    : truncateGeneratedExcerpt(excerpt);
}

function isLegalArticleCategory(value: unknown): value is LegalArticleCategory {
  return legalArticleCategories.includes(value as SanityLegalArticleCategory);
}

function mapImageCrop(crop: SanityImageCrop | undefined): CaseStudyImageCrop | undefined {
  if (!crop) {
    return undefined;
  }

  return {
    top: crop.top,
    bottom: crop.bottom,
    left: crop.left,
    right: crop.right,
  };
}

function mapImageHotspot(
  hotspot: SanityImageHotspot | undefined,
): CaseStudyImageHotspot | undefined {
  if (!hotspot) {
    return undefined;
  }

  return {
    x: hotspot.x,
    y: hotspot.y,
    height: hotspot.height,
    width: hotspot.width,
  };
}

function mapCoverImage(image: SanityContentImage | undefined): CaseStudyImage | undefined {
  const ref = optionalTrimmedString(image?.image?.asset?._ref);

  if (!ref) {
    return undefined;
  }

  return {
    asset: {ref, type: "reference"},
    alt: optionalTrimmedString(image?.alt) ?? defaultCoverImageAlt,
    caption: optionalTrimmedString(image?.caption),
    crop: mapImageCrop(image?.image?.crop),
    hotspot: mapImageHotspot(image?.image?.hotspot),
  };
}

function mapPortableText(value: SanityPortableTextBlock[] | undefined): CaseStudyPortableText {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (block): block is SanityPortableTextBlock =>
        Boolean(block) && typeof block._key === "string" && typeof block._type === "string",
    )
    .map(
      (block): CaseStudyPortableTextBlock => ({
        ...block,
        _key: block._key,
        _type: block._type,
      }),
    );
}

function mapSeo(seo: SanitySeoFields | undefined): CaseStudySeo {
  const keywords = Array.isArray(seo?.keywords)
    ? seo.keywords
        .map(optionalTrimmedString)
        .filter((keyword): keyword is string => Boolean(keyword))
    : [];

  return {
    title: optionalTrimmedString(seo?.seoTitle),
    description: optionalTrimmedString(seo?.seoDescription),
    keywords,
    noIndex: seo?.noIndex === true,
  };
}

export function mapSanityLegalArticleListItem(
  article: SanityLegalArticleListItem,
): LegalArticleListItem {
  if (!isLegalArticleCategory(article.category)) {
    throw new LegalArticleMappingError("Legal article category is invalid.");
  }

  return {
    id: requireTrimmedString("_id", article._id),
    title: requireTrimmedString("title", article.title),
    slug: requireTrimmedString("slug", article.slug),
    category: article.category,
    categoryLabel: legalArticleCategoryLabels[article.category],
    excerpt: deriveExcerpt(article),
    coverImage: mapCoverImage(article.coverImage),
  };
}

export function mapSanityLegalArticleListItems(
  articles: SanityLegalArticleListItem[],
): LegalArticleListItem[] {
  return articles.reduce<LegalArticleListItem[]>((mappedArticles, article) => {
    try {
      mappedArticles.push(mapSanityLegalArticleListItem(article));
    } catch (error) {
      if (!(error instanceof LegalArticleMappingError)) {
        throw error;
      }
    }

    return mappedArticles;
  }, []);
}

export function mapSanityLegalArticleDetail(
  article: SanityLegalArticleDetail,
): LegalArticleDetail {
  const sourcePlatform = optionalTrimmedString(article.source?.platform);
  const sourceUrl = optionalTrimmedString(article.source?.url);

  return {
    ...mapSanityLegalArticleListItem(article),
    body: mapPortableText(article.body),
    source:
      sourcePlatform || sourceUrl
        ? {platform: sourcePlatform, url: sourceUrl}
        : undefined,
    seo: mapSeo(article.seo),
  };
}

export function mapNullableSanityLegalArticleDetail(
  article: SanityLegalArticleDetail | null,
): LegalArticleDetail | null {
  return article ? mapSanityLegalArticleDetail(article) : null;
}

export function mapSanityLegalArticleSlugs(articles: SanityLegalArticleSlug[]): string[] {
  return articles.reduce<string[]>((slugs, article) => {
    try {
      slugs.push(requireTrimmedString("slug", article.slug));
    } catch (error) {
      if (!(error instanceof LegalArticleMappingError)) {
        throw error;
      }
    }

    return slugs;
  }, []);
}
