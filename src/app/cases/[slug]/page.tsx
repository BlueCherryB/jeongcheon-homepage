import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseConsultationCta } from "@/components/cases/CaseConsultationCta";
import { CaseDetailHero } from "@/components/cases/CaseDetailHero";
import { CaseDetailSection } from "@/components/cases/CaseDetailSection";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/data/cases";
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/lib/cases";

type CaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "수행사례를 찾을 수 없습니다 | 법률사무소 정천",
    };
  }

  const url = `/cases/${caseStudy.slug}`;

  return {
    title: `${caseStudy.title} | 수행사례 | 법률사무소 정천`,
    description: caseStudy.summary,
    keywords: caseStudy.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${caseStudy.title} | 수행사례 | 법률사무소 정천`,
      description: caseStudy.summary,
      url,
      type: "article",
      publishedTime: caseStudy.publishedAt,
      section: caseStudy.categoryLabel,
      tags: caseStudy.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | 수행사례 | 법률사무소 정천`,
      description: caseStudy.summary,
    },
  };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCases = getRelatedCaseStudies(caseStudy);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.publishedAt,
    articleSection: caseStudy.categoryLabel,
    keywords: caseStudy.keywords,
    mainEntityOfPage: `/cases/${caseStudy.slug}`,
    author: {
      "@type": "Organization",
      name: "정천 법률사무소",
    },
    publisher: {
      "@type": "Organization",
      name: "정천 법률사무소",
    },
    url: `/cases/${caseStudy.slug}`,
  };

  return (
    <>
      <main className="bg-white text-[#111B36]">
        <CaseDetailHero caseStudy={caseStudy} />

        <Container className="py-16 lg:py-20">
          <div className="rounded-[22px] border border-[#E8E2D7] bg-white px-7 shadow-[0_18px_54px_rgba(17,27,54,0.05)] sm:px-10 lg:px-12">
            <CaseDetailSection icon="document" title="사건의 개요">
              <div className="space-y-5">
                {caseStudy.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CaseDetailSection>

            <CaseDetailSection icon="search" title="주요 쟁점">
              <ul className="space-y-3">
                {caseStudy.issues.map((issue) => (
                  <li key={issue} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A96A]"
                    />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </CaseDetailSection>

            <CaseDetailSection icon="shield" title="정천의 대응">
              <div className="space-y-5">
                {caseStudy.strategy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CaseDetailSection>

            <CaseDetailSection icon="result" title="사건의 결과">
              <div className="space-y-5">
                {caseStudy.outcome.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CaseDetailSection>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {caseStudy.relatedPracticeIds.map((practiceId) => (
              <span
                key={practiceId}
                className="rounded-full border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-2 text-sm font-medium text-[#111B36]/75"
              >
                {practiceId}
              </span>
            ))}
          </div>

          {relatedCases.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-[#111B36]">
                관련 수행사례
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {relatedCases.slice(0, 2).map((relatedCase) => (
                  <Link
                    key={relatedCase.slug}
                    href={`/cases/${relatedCase.slug}`}
                    className="rounded-lg border border-[#E8E2D7] bg-white p-5 transition-colors hover:border-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]"
                  >
                    <p className="text-sm font-semibold text-[#C8A96A]">
                      {relatedCase.categoryLabel}
                    </p>
                    <p className="mt-2 font-semibold leading-6">
                      {relatedCase.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-10 flex justify-end">
            <Link
              href="/cases"
              aria-label="수행사례 목록으로 이동"
              className="inline-flex items-center justify-center border border-[#C8A96A] bg-white px-6 py-3 text-sm font-semibold text-[#111B36] transition-colors hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] max-sm:w-full"
            >
              목록
            </Link>
          </div>

          <CaseConsultationCta />
        </Container>
      </main>

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
