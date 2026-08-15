import type {CaseStudyImage, CaseStudyPortableText, CaseStudySeo} from "@/types/content/caseStudy";

export const legalArticleCategoryLabels = {
  criminal: "형사",
  civil: "민사",
  family: "가사",
  general: "기타",
} as const;

export type LegalArticleCategory = keyof typeof legalArticleCategoryLabels;

export type LegalArticleSource = {
  platform?: string;
  url?: string;
};

export type LegalArticleListItem = {
  id: string;
  title: string;
  slug: string;
  category: LegalArticleCategory;
  categoryLabel: string;
  excerpt: string;
  publishedAt: string;
  displayDate: string;
  coverImage?: CaseStudyImage;
};

export type LegalArticleDetail = LegalArticleListItem & {
  body: CaseStudyPortableText;
  source?: LegalArticleSource;
  seo: CaseStudySeo;
};
