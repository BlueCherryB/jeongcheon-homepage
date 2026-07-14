export type SanityCaseCategory = "criminal" | "civil" | "family";

export type SanityImageAssetReference = {
  _ref: string;
  _type: "reference";
};

export type SanityImageCrop = {
  _type?: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type?: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityContentImage = {
  image?: {
    asset?: SanityImageAssetReference;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
  alt?: string;
  caption?: string;
};

export type SanityPortableTextBlock = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

export type SanitySeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type SanityCaseStudyListItem = {
  _id: string;
  title?: string;
  slug?: string;
  category?: SanityCaseCategory;
  result?: string;
  summary?: string;
  publishedAt?: string;
  featured?: boolean;
  sortOrder?: number;
  mainImage?: SanityContentImage;
};

export type SanityCaseStudyDetail = SanityCaseStudyListItem & {
  overview?: SanityPortableTextBlock[];
  legalIssues?: SanityPortableTextBlock[];
  response?: SanityPortableTextBlock[];
  outcome?: SanityPortableTextBlock[];
  seo?: SanitySeoFields;
};

export type SanityCaseStudySlug = {
  slug?: string;
};
