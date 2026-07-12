import Link from "next/link";

import { buildCasesHref } from "@/lib/cases";
import type { CaseFilterValue } from "@/lib/cases";

type CasePaginationProps = {
  category: CaseFilterValue;
  currentPage: number;
  totalCount: number;
  totalPages: number;
};

export function CasePagination({
  category,
  currentPage,
  totalCount,
  totalPages,
}: CasePaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <nav aria-label="수행사례 페이지네이션">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          <li>
            {hasPrevious ? (
              <Link
                href={buildCasesHref({ category, page: currentPage - 1 })}
                aria-label="이전 페이지"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E8E2D7] bg-white text-[#111B36] transition-colors hover:border-[#C8A96A] hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
              >
                ‹
              </Link>
            ) : (
              <span
                aria-disabled="true"
                aria-label="이전 페이지 없음"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E8E2D7] bg-white/60 text-zinc-300"
              >
                ‹
              </span>
            )}
          </li>

          {pages.map((page) => {
            const isCurrent = page === currentPage;

            return (
              <li key={page}>
                <Link
                  href={buildCasesHref({ category, page })}
                  aria-current={isCurrent ? "page" : undefined}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-md border text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                    isCurrent
                      ? "border-[#111B36] bg-[#111B36] text-white"
                      : "border-[#E8E2D7] bg-white text-[#111B36] hover:border-[#C8A96A] hover:text-[#C8A96A]",
                  ].join(" ")}
                >
                  {page}
                </Link>
              </li>
            );
          })}

          <li>
            {hasNext ? (
              <Link
                href={buildCasesHref({ category, page: currentPage + 1 })}
                aria-label="다음 페이지"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E8E2D7] bg-white text-[#111B36] transition-colors hover:border-[#C8A96A] hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
              >
                ›
              </Link>
            ) : (
              <span
                aria-disabled="true"
                aria-label="다음 페이지 없음"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E8E2D7] bg-white/60 text-zinc-300"
              >
                ›
              </span>
            )}
          </li>
        </ul>
      </nav>

      <p className="text-sm text-[#111B36]/70">
        총 {totalCount}건 <span aria-hidden="true">|</span> {currentPage} /{" "}
        {totalPages} 페이지
      </p>
    </div>
  );
}
