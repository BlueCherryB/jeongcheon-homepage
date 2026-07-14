import type {
  SanityCaseCategory,
  SanityCaseStudyDetail,
  SanityCaseStudyListItem,
  SanityCaseStudySlug,
  SanityContentImage,
  SanityImageCrop,
  SanityImageHotspot,
  SanityPortableTextBlock,
  SanitySeoFields,
} from "@/lib/cms/types/caseStudy";
import {
  caseStudyCategoryLabels,
  type CaseStudyCategory,
  type CaseStudyDetail,
  type CaseStudyImage,
  type CaseStudyImageCrop,
  type CaseStudyImageHotspot,
  type CaseStudyListItem,
  type CaseStudyPortableText,
  type CaseStudyPortableTextBlock,
  type CaseStudySeo,
} from "@/types/content/caseStudy";

const caseStudyCategories = ["criminal", "civil", "family"] as const;

export class CaseStudyMappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CaseStudyMappingError";
  }
}

function isCaseStudyCategory(value: unknown): value is CaseStudyCategory {
  return caseStudyCategories.includes(value as SanityCaseCategory);
}

function requireTrimmedString(fieldName: string, value: unknown): string {
  if (typeof value !== "string") {
    throw new CaseStudyMappingError(`Case Study ${fieldName} is required.`);
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new CaseStudyMappingError(`Case Study ${fieldName} must not be empty.`);
  }

  return trimmedValue;
}

function optionalTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue || undefined;
}

function mapCategory(value: unknown): CaseStudyCategory {
  if (!isCaseStudyCategory(value)) {
    throw new CaseStudyMappingError("Case Study category is invalid.");
  }

  return value;
}

function mapNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function mapBoolean(value: unknown): boolean {
  return typeof value === "boolean" ? value : false;
}

function mapImageCrop(crop: SanityImageCrop | undefined): CaseStudyImageCrop | undefined {
  if (!crop) {
    return undefined;
  }

  return {
    top: mapNumber(crop.top),
    bottom: mapNumber(crop.bottom),
    left: mapNumber(crop.left),
    right: mapNumber(crop.right),
  };
}

function mapImageHotspot(
  hotspot: SanityImageHotspot | undefined,
): CaseStudyImageHotspot | undefined {
  if (!hotspot) {
    return undefined;
  }

  return {
    x: mapNumber(hotspot.x),
    y: mapNumber(hotspot.y),
    height: mapNumber(hotspot.height),
    width: mapNumber(hotspot.width),
  };
}

function mapImage(image: SanityContentImage | undefined): CaseStudyImage | undefined {
  const assetRef = optionalTrimmedString(image?.image?.asset?._ref);

  if (!assetRef) {
    return undefined;
  }

  return {
    asset: {
      ref: assetRef,
      type: "reference",
    },
    alt: requireTrimmedString("image alt text", image?.alt),
    caption: optionalTrimmedString(image?.caption),
    crop: mapImageCrop(image?.image?.crop),
    hotspot: mapImageHotspot(image?.image?.hotspot),
  };
}

function isPortableTextBlock(value: unknown): value is SanityPortableTextBlock {
  if (!value || typeof value !== "object") {
    return false;
  }

  const block = value as Partial<SanityPortableTextBlock>;

  return typeof block._key === "string" && typeof block._type === "string";
}

function mapPortableTextBlocks(
  blocks: SanityPortableTextBlock[] | undefined,
): CaseStudyPortableText {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.filter(isPortableTextBlock).map((block): CaseStudyPortableTextBlock => ({
    ...block,
    _key: block._key,
    _type: block._type,
  }));
}

function mapKeywords(keywords: unknown): string[] {
  if (!Array.isArray(keywords)) {
    return [];
  }

  return keywords
    .map(optionalTrimmedString)
    .filter((keyword): keyword is string => Boolean(keyword));
}

function mapSeo(seo: SanitySeoFields | undefined): CaseStudySeo {
  return {
    title: optionalTrimmedString(seo?.seoTitle),
    description: optionalTrimmedString(seo?.seoDescription),
    keywords: mapKeywords(seo?.keywords),
    noIndex: typeof seo?.noIndex === "boolean" ? seo.noIndex : false,
  };
}

export function mapSanityCaseStudyListItem(
  caseStudy: SanityCaseStudyListItem,
): CaseStudyListItem {
  const category = mapCategory(caseStudy.category);

  return {
    id: requireTrimmedString("_id", caseStudy._id),
    title: requireTrimmedString("title", caseStudy.title),
    slug: requireTrimmedString("slug", caseStudy.slug),
    category,
    categoryId: category,
    categoryLabel: caseStudyCategoryLabels[category],
    result: requireTrimmedString("result", caseStudy.result),
    summary: requireTrimmedString("summary", caseStudy.summary),
    publishedAt: optionalTrimmedString(caseStudy.publishedAt),
    featured: mapBoolean(caseStudy.featured),
    sortOrder: mapNumber(caseStudy.sortOrder),
    image: mapImage(caseStudy.mainImage),
  };
}

export function mapSanityCaseStudyListItems(
  caseStudies: SanityCaseStudyListItem[],
): CaseStudyListItem[] {
  return caseStudies.reduce<CaseStudyListItem[]>((mappedCaseStudies, caseStudy) => {
    try {
      mappedCaseStudies.push(mapSanityCaseStudyListItem(caseStudy));
    } catch (error) {
      if (!(error instanceof CaseStudyMappingError)) {
        throw error;
      }
    }

    return mappedCaseStudies;
  }, []);
}

export function mapSanityCaseStudyDetail(
  caseStudy: SanityCaseStudyDetail,
): CaseStudyDetail {
  return {
    ...mapSanityCaseStudyListItem(caseStudy),
    overview: mapPortableTextBlocks(caseStudy.overview),
    issues: mapPortableTextBlocks(caseStudy.legalIssues),
    response: mapPortableTextBlocks(caseStudy.response),
    outcome: mapPortableTextBlocks(caseStudy.outcome),
    seo: mapSeo(caseStudy.seo),
  };
}

export function mapNullableSanityCaseStudyDetail(
  caseStudy: SanityCaseStudyDetail | null,
): CaseStudyDetail | null {
  return caseStudy ? mapSanityCaseStudyDetail(caseStudy) : null;
}

export function mapSanityCaseStudySlug(caseStudy: SanityCaseStudySlug): string {
  return requireTrimmedString("slug", caseStudy.slug);
}

export function mapSanityCaseStudySlugs(caseStudies: SanityCaseStudySlug[]): string[] {
  return caseStudies.reduce<string[]>((mappedSlugs, caseStudy) => {
    try {
      mappedSlugs.push(mapSanityCaseStudySlug(caseStudy));
    } catch (error) {
      if (!(error instanceof CaseStudyMappingError)) {
        throw error;
      }
    }

    return mappedSlugs;
  }, []);
}
