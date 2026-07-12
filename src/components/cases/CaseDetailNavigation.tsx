import Link from "next/link";

import type { CaseStudy } from "@/data/cases";

type CaseDetailNavigationProps = {
  previousCase?: CaseStudy;
  nextCase?: CaseStudy;
};

function AdjacentCaseLink({
  caseStudy,
  direction,
}: {
  caseStudy?: CaseStudy;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "이전 사례" : "다음 사례";
  const arrow = isPrevious ? "←" : "→";

  if (!caseStudy) {
    return (
      <div className="rounded-lg border border-[#E8E2D7] bg-white/60 p-6 text-[#111B36]/35">
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-3 text-sm">표시할 사례가 없습니다.</p>
      </div>
    );
  }

  return (
    <Link
      href={`/cases/${caseStudy.slug}`}
      aria-label={`${label}: ${caseStudy.title}`}
      className="group rounded-lg border border-[#E8E2D7] bg-white p-6 transition-colors hover:border-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]"
    >
      <p className="text-sm font-semibold text-[#C8A96A]">
        <span aria-hidden="true">{isPrevious ? `${arrow} ` : null}</span>
        {label}
        <span aria-hidden="true">{isPrevious ? null : ` ${arrow}`}</span>
      </p>
      <p className="mt-3 font-semibold leading-6 text-[#111B36] transition-colors group-hover:text-[#9F7F37]">
        {caseStudy.title}
      </p>
      <time
        dateTime={caseStudy.publishedAt}
        className="mt-2 block text-sm text-[#111B36]/60"
      >
        {caseStudy.displayDate}
      </time>
    </Link>
  );
}

export function CaseDetailNavigation({
  previousCase,
  nextCase,
}: CaseDetailNavigationProps) {
  return (
    <nav aria-label="수행사례 이전 다음" className="mt-14">
      <div className="grid gap-4 lg:grid-cols-[1fr_180px_1fr]">
        <AdjacentCaseLink caseStudy={previousCase} direction="previous" />

        <Link
          href="/cases"
          className="flex items-center justify-center rounded-lg border border-[#C8A96A] bg-white px-6 py-5 text-sm font-semibold text-[#111B36] transition-colors hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]"
        >
          <span aria-hidden="true" className="mr-2">
            ≡
          </span>
          목록으로
        </Link>

        <AdjacentCaseLink caseStudy={nextCase} direction="next" />
      </div>
    </nav>
  );
}
