import Link from "next/link";

import {
  CaseStudyCard,
  type CaseStudyCardItem,
} from "@/components/home/CaseStudyCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

type CasesSectionProps = {
  caseStudies: CaseStudyCardItem[];
};

export function CasesSection({ caseStudies }: CasesSectionProps) {
  const { cases } = homepageContent;

  return (
    <section id={cases.id} className="bg-[#FAF8F4]">
      <Container className="py-24 lg:py-32">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
              {cases.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="mt-2.5 h-px w-28 bg-[#C8A96A]"
            />
          </div>

          <SectionHeading
            title={cases.heading}
            titleClassName="font-chosun mx-auto mt-9 max-w-4xl text-[28px] font-normal leading-[1.45] tracking-[-0.02em] text-[#111B36] sm:text-[34px] lg:text-[38px]"
          />
        </div>

        <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div
            aria-label="사례 카테고리"
            className="flex flex-wrap gap-3"
            role="group"
          >
            {cases.filters.map((filter, index) => {
              const isSelected = index === 0;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isSelected}
                  className={[
                    "min-w-24 rounded-full border px-7 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                    isSelected
                      ? "border-[#111B36] bg-[#111B36] text-white"
                      : "border-[#D8D1C5] bg-white/70 text-[#111B36] hover:border-[#C8A96A] hover:text-[#9F7F37]",
                  ].join(" ")}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <Link
            href={cases.viewAllHref}
            className="inline-flex items-center justify-center border border-[#C8A96A] bg-transparent px-8 py-3 text-sm font-semibold text-[#111B36] transition-colors hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A] md:min-w-44"
          >
            <span>{cases.viewAllLabel}</span>
            <span aria-hidden="true" className="ml-5 text-[#C8A96A]">
              →
            </span>
          </Link>
        </div>

        {caseStudies.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
