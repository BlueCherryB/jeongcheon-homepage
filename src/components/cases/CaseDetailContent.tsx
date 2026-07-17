import Link from "next/link";

import { CaseConsultationCta } from "@/components/cases/CaseConsultationCta";
import { CaseDetailSection } from "@/components/cases/CaseDetailSection";
import { PortableTextContent } from "@/components/cases/PortableTextContent";
import { Container } from "@/components/ui/Container";
import type {
  CaseStudyDetail,
  CaseStudyListItem,
} from "@/types/content/caseStudy";

type CaseDetailContentProps = {
  caseStudy: CaseStudyDetail;
  relatedCases: CaseStudyListItem[];
};

export function CaseDetailContent({
  caseStudy,
  relatedCases,
}: CaseDetailContentProps) {
  return (
    <Container className="py-16 lg:py-20">
      <div className="rounded-[22px] border border-[#E8E2D7] bg-white px-7 shadow-[0_18px_54px_rgba(17,27,54,0.05)] sm:px-10 lg:px-12">
        <CaseDetailSection icon="document" title="사건의 개요">
          <PortableTextContent value={caseStudy.overview} />
        </CaseDetailSection>

        <CaseDetailSection icon="search" title="주요 쟁점">
          <PortableTextContent value={caseStudy.issues} variant="list" />
        </CaseDetailSection>

        {/* "정천의 대응" is intentionally hidden for now and may be restored later. */}

        <CaseDetailSection icon="result" title="사건의 결과">
          <PortableTextContent value={caseStudy.outcome} />
        </CaseDetailSection>
      </div>

      {caseStudy.keywords.length > 0 ? (
        <section className="mt-10 border-y border-[#E8E2D7] py-8">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-[#C8A96A]">
            관련 키워드
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-2 text-sm font-semibold text-[#111B36]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.relatedPracticeIds.length > 0 ? (
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
      ) : null}

      {relatedCases.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[#111B36]">
            관련 수행사례
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedCases.map((relatedCase) => (
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
  );
}
