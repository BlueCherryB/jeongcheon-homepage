import Link from "next/link";

import type { SearchResult } from "@/types/content/search";

type SearchResultListProps = {
  results: SearchResult[];
};

export function SearchResultList({ results }: SearchResultListProps) {
  return (
    <div className="border-t border-[#D8D1C5]">
      {results.map((result) => (
        <article key={`${result.contentType}-${result.id}`} className="border-b border-[#E8E2D7]">
          <Link
            href={result.href}
            className="group block py-7 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] sm:py-9"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
              <span className="text-[#9F7F37]">[{result.contentTypeLabel}]</span>
              <span className="text-[#111B36]/65">{result.categoryLabel}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold leading-snug text-[#111B36] transition-colors group-hover:text-[#9F7F37] sm:text-2xl">
              {result.title}
            </h2>
            {result.excerpt ? (
              <p className="mt-3 line-clamp-2 max-w-4xl text-[15px] leading-7 text-zinc-600 sm:text-base">
                {result.excerpt}
              </p>
            ) : null}
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#111B36] transition-colors group-hover:text-[#C8980A]">
              자세히 보기
              <span aria-hidden="true" className="ml-2 text-xl leading-none">
                →
              </span>
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
