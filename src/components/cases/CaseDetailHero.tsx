import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { CaseStudy } from "@/data/cases";

type CaseDetailHeroProps = {
  caseStudy: CaseStudy;
};

export function CaseDetailHero({ caseStudy }: CaseDetailHeroProps) {
  return (
    <section className="overflow-hidden border-b border-[#E8E2D7] bg-[#FAF8F4]">
      <Container className="py-12 lg:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-[#111B36]/70">
          <ol className="flex flex-wrap items-center gap-3">
            <li>
              <Link
                href="/"
                className="hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#C8A96A]">
              ›
            </li>
            <li>
              <Link
                href="/cases"
                className="hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
              >
                수행사례
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#C8A96A]">
              ›
            </li>
            <li aria-current="page" className="max-w-full text-[#111B36]">
              {caseStudy.title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
          <div>
            <p className="font-semibold text-[#C8A96A]">
              {caseStudy.categoryLabel}
            </p>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
              <h1 className="font-chosun max-w-3xl text-[34px] font-normal leading-[1.25] tracking-[-0.02em] text-[#111B36] sm:text-[42px]">
                {caseStudy.title}
              </h1>
              <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border border-[#C8A96A] text-center">
                <p className="text-xl font-bold text-[#C8A96A]">
                  {caseStudy.result}
                </p>
                <p className="mt-1 px-3 text-xs font-semibold leading-5 text-[#111B36]">
                  {caseStudy.resultDetail}
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#111B36]/78 sm:text-lg">
              {caseStudy.summary}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-medium text-[#111B36]/70">
              <time dateTime={caseStudy.publishedAt}>
                {caseStudy.displayDate}
              </time>
              <span aria-hidden="true" className="h-px w-10 bg-[#C8A96A]" />
              <span>{caseStudy.categoryLabel} 사례</span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hidden aspect-[4/3] rounded-[22px] bg-[#D8D4CC] shadow-[0_24px_70px_rgba(17,27,54,0.08)] lg:block"
          />
        </div>
      </Container>
    </section>
  );
}
