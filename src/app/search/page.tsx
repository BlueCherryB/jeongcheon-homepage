import type { Metadata } from "next";
import Link from "next/link";

import { SearchForm } from "@/components/search/SearchForm";
import { SearchResultList } from "@/components/search/SearchResultList";
import { Container } from "@/components/ui/Container";
import { getSearchResults } from "@/lib/content/search";
import {
  buildSearchHref,
  getSearchPaginationPages,
  normalizeSearchQuery,
  parseSearchPage,
} from "@/lib/search";

export const metadata: Metadata = {
  title: "통합 검색 | 법률사무소 정천",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const query = normalizeSearchQuery(getSingleSearchParam(resolvedSearchParams.q));
  const requestedPage = parseSearchPage(getSingleSearchParam(resolvedSearchParams.page));
  const searchResponse = query
    ? await getSearchResults(query, requestedPage)
    : undefined;

  return (
    <main className="min-h-[65vh] bg-[#FAF8F4] text-[#111B36]">
      <Container className="py-16 sm:py-20 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#9F7F37]">
            SEARCH
          </p>
          <h1 className="font-chosun mt-5 text-4xl font-normal leading-tight sm:text-5xl">
            {query ? `'${query}' 검색 결과` : "통합 검색"}
          </h1>
          <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">
            수행 사례와 법률 정보에서 필요한 내용을 찾아보세요.
          </p>
        </header>

        <div className="mt-10">
          <SearchForm defaultValue={query} />
        </div>

        {searchResponse ? (
          <section aria-label="검색 결과" className="mt-10 sm:mt-12">
            <p className="text-sm font-semibold text-[#111B36]/70">
              총 {searchResponse.totalCount}건
            </p>
            {searchResponse.results.length > 0 ? (
              <>
                <div className="mt-4">
                  <SearchResultList results={searchResponse.results} />
                </div>
                {searchResponse.totalPages > 1 ? (
                  <nav aria-label="검색 결과 페이지" className="mt-10 flex items-center justify-center gap-2">
                    {getSearchPaginationPages(
                      searchResponse.currentPage,
                      searchResponse.totalPages,
                    ).map(
                      (page) => (
                        <Link
                          key={page}
                          href={buildSearchHref(query, page)}
                          aria-current={page === searchResponse.currentPage ? "page" : undefined}
                          className={[
                            "inline-flex h-10 min-w-10 items-center justify-center border px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                            page === searchResponse.currentPage
                              ? "border-[#0F172A] bg-[#0F172A] text-white"
                              : "border-[#D8D1C5] bg-white text-[#111B36] hover:border-[#C8A96A]",
                          ].join(" ")}
                        >
                          {page}
                        </Link>
                      ),
                    )}
                  </nav>
                ) : null}
              </>
            ) : (
              <p className="mt-4 border-y border-[#E8E2D7] py-16 text-center text-[#111B36]/65">
                &apos;{query}&apos;에 대한 검색 결과가 없습니다.
              </p>
            )}
          </section>
        ) : (
          <p className="mt-12 border-y border-[#E8E2D7] py-16 text-center text-[#111B36]/65">
            검색어를 입력해 주세요.
          </p>
        )}
      </Container>
    </main>
  );
}
