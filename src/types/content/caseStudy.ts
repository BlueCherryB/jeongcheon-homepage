export type CaseStudyCategory = "criminal" | "civil" | "family";

export type CaseStudyCategoryLabel = "형사" | "민사" | "이혼·가사";

export const caseStudyCategoryLabels = {
  criminal: "형사",
  civil: "민사",
  family: "이혼·가사",
} as const satisfies Record<CaseStudyCategory, CaseStudyCategoryLabel>;

export type CaseStudyImageAssetReference = {
  ref: string;
  type: "reference";
};

export type CaseStudyImageCrop = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type CaseStudyImageHotspot = {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type CaseStudyImage = {
  asset: CaseStudyImageAssetReference;
  alt: string;
  caption?: string;
  crop?: CaseStudyImageCrop;
  hotspot?: CaseStudyImageHotspot;
};

export type CaseStudyPortableTextBlock = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

export type CaseStudyPortableText = CaseStudyPortableTextBlock[];

export type CaseStudySeo = {
  title?: string;
  description?: string;
  keywords: string[];
  noIndex: boolean;
};

export type CaseStudyListItem = {
  id: string;
  title: string;
  slug: string;
  category: CaseStudyCategory;
  categoryId: CaseStudyCategory;
  categoryLabel: CaseStudyCategoryLabel;
  result: string;
  resultDetail: string;
  summary: string;
  publishedAt?: string;
  displayDate?: string;
  featured: boolean;
  sortOrder?: number;
  image?: CaseStudyImage;
};

export type CaseStudyDetail = CaseStudyListItem & {
  overview: CaseStudyPortableText;
  issues: CaseStudyPortableText;
  response: CaseStudyPortableText;
  outcome: CaseStudyPortableText;
  keywords: string[];
  relatedPracticeIds: string[];
  relatedCaseSlugs: string[];
  seo: CaseStudySeo;
};
