import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseDetailContent } from "@/components/cases/CaseDetailContent";
import { CaseDetailHero } from "@/components/cases/CaseDetailHero";
import { portableTextToPlainText } from "@/components/cases/PortableTextContent";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getRelatedCaseStudyListItems } from "@/lib/cases";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/content/caseStudies";
import { buildCaseStudyArticleStructuredData } from "@/lib/structuredData";
import type { CaseStudyDetail } from "@/types/content/caseStudy";

type CaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function buildCaseStudyUrl(slug: string): string {
  return `/cases/${slug}`;
}

function getCaseStudyKeywords(caseStudy: CaseStudyDetail): string[] {
  return caseStudy.seo.keywords.length > 0
    ? caseStudy.seo.keywords
    : caseStudy.keywords;
}

function getCaseStudyDescription(caseStudy: CaseStudyDetail): string {
  return caseStudy.seo.description ?? caseStudy.summary;
}

function getCaseStudyTitle(caseStudy: CaseStudyDetail): string {
  return caseStudy.seo.title ?? `${caseStudy.title} | 수행사례 | 법률사무소 정천`;
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "수행사례를 찾을 수 없습니다 | 법률사무소 정천",
      alternates: {
        canonical: buildCaseStudyUrl(slug),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = buildCaseStudyUrl(caseStudy.slug);
  const title = getCaseStudyTitle(caseStudy);
  const description = getCaseStudyDescription(caseStudy);
  const keywords = getCaseStudyKeywords(caseStudy);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: caseStudy.seo.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: caseStudy.publishedAt,
      section: caseStudy.categoryLabel,
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const allCaseStudies = await getCaseStudies();
  const relatedCases = getRelatedCaseStudyListItems(caseStudy, allCaseStudies);
  const url = buildCaseStudyUrl(caseStudy.slug);
  const keywords = getCaseStudyKeywords(caseStudy);
  const articleBody = [
    portableTextToPlainText(caseStudy.overview),
    portableTextToPlainText(caseStudy.issues),
    portableTextToPlainText(caseStudy.response),
    portableTextToPlainText(caseStudy.outcome),
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <main className="bg-white text-[#111B36]">
        <JsonLdScript
          id="case-study-structured-data"
          data={buildCaseStudyArticleStructuredData({
            caseStudy,
            path: url,
            description: getCaseStudyDescription(caseStudy),
            keywords,
            articleBody,
          })}
        />
        <CaseDetailHero caseStudy={caseStudy} />
        <CaseDetailContent caseStudy={caseStudy} relatedCases={relatedCases} />
      </main>
    </>
  );
}
