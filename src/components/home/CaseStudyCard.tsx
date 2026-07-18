import Link from "next/link";

import type { CaseStudyImage } from "@/types/content/caseStudy";

export type CaseStudyCardItem = {
  slug: string;
  categoryLabel: string;
  title: string;
  summary: string;
  result: string;
  resultDetail: string;
  publishedAt?: string;
  displayDate?: string;
  image?: CaseStudyImage;
};

type CaseStudyCardProps = {
  caseStudy: CaseStudyCardItem;
  variant?: "preview" | "board";
};

export function CaseStudyCard({
  caseStudy,
  variant = "preview",
}: CaseStudyCardProps) {
  const isBoard = variant === "board";

  return (
    <Link
      href={`/cases/${caseStudy.slug}`}
      aria-label={`${caseStudy.title} 사례 자세히 보기`}
      className={[
        "group block rounded-lg border border-[#E8E2D7] bg-white px-6 shadow-[0_16px_40px_rgba(17,27,54,0.06)] transition duration-300 hover:border-[#C8A96A]/65 hover:shadow-[0_22px_54px_rgba(17,27,54,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] sm:px-8 lg:px-10",
        isBoard ? "py-6" : "py-7",
      ].join(" ")}
    >
      <article
        className={[
          "grid gap-6 lg:items-center lg:gap-8",
          isBoard
            ? "lg:grid-cols-[120px_minmax(0,1fr)_150px_126px]"
            : "lg:grid-cols-[120px_minmax(0,1fr)_150px_132px]",
        ].join(" ")}
      >
        <div className="flex items-center lg:min-h-20 lg:border-r lg:border-[#E8E2D7]">
          <div>
            <p className="text-base font-bold text-[#111B36]">
              {caseStudy.categoryLabel}
            </p>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-16 bg-[#C8A96A]"
            />
          </div>
        </div>

        <div className="min-w-0 lg:pr-4">
          <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.01em] text-[#111B36] transition-colors group-hover:text-[#9F7F37]">
            {caseStudy.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-600 sm:line-clamp-2 sm:text-base">
            {caseStudy.summary}
          </p>
        </div>

        <div className="flex justify-start lg:justify-center lg:border-l lg:border-[#E8E2D7] lg:pl-8">
          <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border border-[#C8A96A] text-center text-[#111B36]">
            <p className="text-xl font-bold text-[#C8A96A]">
              {caseStudy.result}
            </p>
            <p className="mt-1 px-3 text-xs font-semibold leading-5">
              {caseStudy.resultDetail}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E8E2D7] pt-5 text-sm font-medium text-[#111B36] lg:border-l lg:border-t-0 lg:py-4 lg:pl-8">
          <time dateTime={caseStudy.publishedAt}>
            {caseStudy.displayDate ?? caseStudy.publishedAt}
          </time>
          <span
            aria-hidden="true"
            className="text-2xl leading-none text-[#C8A96A] transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
