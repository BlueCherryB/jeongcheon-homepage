import type {
  SanityContentImage,
  SanityPortableTextBlock,
  SanitySeoFields,
} from "@/lib/cms/types/caseStudy";

export type SanityLegalArticleCategory = "criminal" | "civil" | "family" | "general";

export type SanityLegalArticleSource = {
  platform?: string;
  url?: string;
};

export type SanityLegalArticleListItem = {
  _id: string;
  title?: string;
  slug?: string;
  category?: SanityLegalArticleCategory;
  excerpt?: string;
  body?: SanityPortableTextBlock[];
  publishedAt?: string;
  coverImage?: SanityContentImage;
};

export type SanityLegalArticleDetail = SanityLegalArticleListItem & {
  source?: SanityLegalArticleSource;
  seo?: SanitySeoFields;
};

export type SanityLegalArticleSlug = {
  slug?: string;
};
