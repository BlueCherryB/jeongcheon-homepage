import Link from "next/link";

import {
  buildLegalInfoHref,
  legalArticleCategoryFilters,
  type LegalArticleFilterValue,
} from "@/lib/legalArticles";

type LegalArticleCategoryFilterProps = {
  activeCategory: LegalArticleFilterValue;
};

export function LegalArticleCategoryFilter({
  activeCategory,
}: LegalArticleCategoryFilterProps) {
  return (
    <nav aria-label="법률 정보 분야">
      <ul className="flex flex-wrap gap-2.5">
        {legalArticleCategoryFilters.map((filter) => {
          const isActive = filter.value === activeCategory;

          return (
            <li key={filter.value}>
              <Link
                href={buildLegalInfoHref(filter.value)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "inline-flex min-w-20 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                  isActive
                    ? "border-[#111B36] bg-[#111B36] text-white"
                    : "border-[#D8D1C5] bg-white text-[#111B36] hover:border-[#C8A96A] hover:text-[#9F7F37]",
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
