import type { Metadata } from "next";

import { CaseCategoryFilter } from "@/components/cases/CaseCategoryFilter";
import { CasePagination } from "@/components/cases/CasePagination";
import { CasesPageHero } from "@/components/cases/CasesPageHero";
import { CaseStudyList } from "@/components/cases/CaseStudyList";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/data/cases";
import {
  filterCases,
  getPaginationState,
  parseCaseCategory,
  parsePage,
  sortCasesLatestFirst,
} from "@/lib/cases";

export const metadata: Metadata = {
  title: "수행사례 | 법률사무소 정천",
  description:
    "법률사무소 정천의 형사, 민사, 이혼·가사 사건에서 의뢰인의 권익을 보호하고 해결한 수행사례를 소개합니다.",
};

type CasesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const activeCategory = parseCaseCategory(
    getSingleSearchParam(resolvedSearchParams.category),
  );
  const requestedPage = parsePage(getSingleSearchParam(resolvedSearchParams.page));
  const sortedCases = sortCasesLatestFirst(caseStudies);
  const filteredCases = filterCases(sortedCases, activeCategory);
  const { currentPage, totalPages, startIndex, endIndex } = getPaginationState(
    filteredCases.length,
    requestedPage,
  );
  const currentCases = filteredCases.slice(startIndex, endIndex);

  return (
    <main className="bg-[#FAF8F4] text-[#111B36]">
      <CasesPageHero />

      <section className="py-8 lg:py-10">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <CaseCategoryFilter activeCategory={activeCategory} />

            <label className="flex w-full max-w-48 items-center justify-between rounded-md border border-[#E8E2D7] bg-white px-5 py-3 text-sm font-semibold text-[#111B36] shadow-[0_10px_24px_rgba(17,27,54,0.04)] md:w-48">
              <span className="sr-only">정렬</span>
              <select
                className="w-full appearance-none bg-transparent font-semibold outline-none"
                defaultValue="latest"
              >
                <option value="latest">최신순</option>
              </select>
              <span aria-hidden="true" className="ml-3 text-[#111B36]/70">
                ˅
              </span>
            </label>
          </div>

          <div className="mt-5">
            <CaseStudyList caseStudies={currentCases} />
          </div>

          <CasePagination
            category={activeCategory}
            currentPage={currentPage}
            totalCount={filteredCases.length}
            totalPages={totalPages}
          />
        </Container>
      </section>
    </main>
  );
}
