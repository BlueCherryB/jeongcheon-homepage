import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {portableTextToPlainText} from "@/components/cases/PortableTextContent";
import {LegalArticleDetail} from "@/components/legal-info/LegalArticleDetail";
import {JsonLdScript} from "@/components/seo/JsonLdScript";
import {getSanityImageUrl} from "@/lib/cms/sanityImage";
import {
  getLegalArticleBySlug,
  getLegalArticleSlugs,
} from "@/lib/content/legalArticles";
import {buildLegalArticleStructuredData} from "@/lib/structuredData";
import type {LegalArticleDetail as LegalArticleDetailType} from "@/types/content/legalArticle";

type LegalArticlePageProps = {
  params: Promise<{slug: string}>;
};

function buildLegalArticlePath(slug: string): string {
  return `/legal-info/${slug}`;
}

function getLegalArticleTitle(article: LegalArticleDetailType): string {
  return article.seo.title ?? `${article.title} | 법률 정보 | 법률사무소 정천`;
}

function getLegalArticleDescription(article: LegalArticleDetailType): string {
  return article.seo.description ?? article.excerpt;
}

export async function generateStaticParams() {
  const slugs = await getLegalArticleSlugs();

  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({params}: LegalArticlePageProps): Promise<Metadata> {
  const {slug} = await params;
  const article = await getLegalArticleBySlug(slug);
  const path = buildLegalArticlePath(slug);

  if (!article) {
    return {
      title: "법률 정보를 찾을 수 없습니다 | 법률사무소 정천",
      alternates: {canonical: path},
      robots: {index: false, follow: false},
    };
  }

  const title = getLegalArticleTitle(article);
  const description = getLegalArticleDescription(article);
  const imageUrl = getSanityImageUrl(article.coverImage, {
    width: 1200,
    quality: 85,
  });

  return {
    title,
    description,
    keywords: article.seo.keywords,
    alternates: {canonical: buildLegalArticlePath(article.slug)},
    robots: article.seo.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      title,
      description,
      url: buildLegalArticlePath(article.slug),
      type: "article",
      publishedTime: article.publishedAt,
      section: article.categoryLabel,
      tags: article.seo.keywords,
      images: imageUrl ? [{url: imageUrl, alt: article.coverImage?.alt}] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function LegalArticlePage({params}: LegalArticlePageProps) {
  const {slug} = await params;
  const article = await getLegalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const path = buildLegalArticlePath(article.slug);

  return (
    <>
      <JsonLdScript
        id="legal-article-structured-data"
        data={buildLegalArticleStructuredData({
          article,
          path,
          articleBody: portableTextToPlainText(article.body),
        })}
      />
      <LegalArticleDetail article={article} />
    </>
  );
}
