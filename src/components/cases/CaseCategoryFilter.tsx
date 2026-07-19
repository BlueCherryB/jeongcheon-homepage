import Link from "next/link";

import { buildCasesHref, caseCategoryFilters } from "@/lib/cases";
import type { CaseFilterValue } from "@/lib/cases";

type CaseCategoryFilterProps = {
  activeCategory: CaseFilterValue;
};

export function CaseCategoryFilter({
  activeCategory,
}: CaseCategoryFilterProps) {
  return (
    <nav aria-label="수행사례 카테고리">
      <ul className="flex flex-wrap gap-3">
        {caseCategoryFilters.map((filter) => {
          const isActive = filter.value === activeCategory;

          return (
            <li key={filter.value}>
              <Link
                href={buildCasesHref({ category: filter.value, page: 1 })}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "inline-flex min-w-24 items-center justify-center rounded-full border px-7 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                  isActive
                    ? "border-[#111B36] bg-[#111B36] text-white"
                    : "border-[#D8D1C5] bg-white/70 text-[#111B36] hover:border-[#C8A96A] hover:text-[#9F7F37]",
                ].join(" ")}
              >
                {filter.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
