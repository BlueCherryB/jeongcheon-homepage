import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import {
  getSanityImageObjectPosition,
  getSanityImageUrl,
} from "@/lib/cms/sanityImage";
import type { CaseStudyDetail } from "@/types/content/caseStudy";

type CaseDetailHeroProps = {
  caseStudy: CaseStudyDetail;
};

export function CaseDetailHero({ caseStudy }: CaseDetailHeroProps) {
  const imageSrc = getSanityImageUrl(caseStudy.image, {
    width: 680,
    quality: 80,
  });
  const imageObjectPosition = getSanityImageObjectPosition(caseStudy.image);

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
              /
            </li>
            <li>
              <Link
                href="/cases"
                className="hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
              >
                수행사례
              </Link>
            </li>
            <li aria-hidden="true" className="hidden text-[#C8A96A] sm:block">
              /
            </li>
            <li
              aria-current="page"
              className="hidden max-w-full text-[#111B36] sm:block"
            >
              {caseStudy.title}
            </li>
          </ol>
        </nav>

        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,680px)_340px] lg:items-center lg:justify-between lg:gap-14">
          <div className="min-w-0">
            <p className="font-semibold text-[#C8A96A]">
              {caseStudy.categoryLabel}
            </p>

            <div className="mt-4 max-w-[680px]">
              <h1 className="font-chosun text-[32px] font-normal leading-[1.5] tracking-[-0.02em] text-[#111B36] sm:text-[42px]">
                {caseStudy.title}
              </h1>
              <div className="mt-5 flex justify-end pr-3 sm:justify-start sm:pr-0">
                <div className="inline-flex max-w-full items-center rounded-full border border-[#D9C89E] bg-white px-5 py-2.5 text-base font-bold text-[#111B36] shadow-[0_14px_34px_rgba(17,27,54,0.07)] sm:px-6 sm:py-3 sm:text-[17px]">
                  <span className="shrink-0 text-sm text-[#C8A96A] sm:text-base">
                    결과
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 h-4 w-px bg-[#D9C89E]"
                  />
                  <span className="min-w-0">
                    <span className="block truncate">{caseStudy.result}</span>
                    {caseStudy.resultDetail ? (
                      <span className="mt-0.5 block truncate text-xs font-semibold text-[#111B36]/72 sm:text-sm">
                        {caseStudy.resultDetail}
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 hidden max-w-[620px] text-base leading-8 text-[#111B36]/78 sm:block sm:text-lg">
              {caseStudy.summary}
            </p>

            <div className="mt-6 hidden flex-wrap items-center gap-4 text-sm font-medium text-[#111B36]/70 sm:flex">
              {caseStudy.publishedAt ? (
                <time dateTime={caseStudy.publishedAt}>
                  {caseStudy.displayDate ?? caseStudy.publishedAt}
                </time>
              ) : null}
              <span aria-hidden="true" className="h-px w-10 bg-[#C8A96A]" />
              <span>{caseStudy.categoryLabel} 사례</span>
            </div>
          </div>

          {imageSrc ? (
            <div className="relative hidden aspect-[3/4] overflow-hidden rounded-[22px] bg-[#D8D4CC] shadow-[0_24px_70px_rgba(17,27,54,0.08)] lg:block">
              <Image
                src={imageSrc}
                alt={caseStudy.image?.alt ?? ""}
                fill
                sizes="340px"
                className="object-cover"
                style={{ objectPosition: imageObjectPosition }}
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="hidden aspect-[3/4] rounded-[22px] bg-[#D8D4CC] shadow-[0_24px_70px_rgba(17,27,54,0.08)] lg:block"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
