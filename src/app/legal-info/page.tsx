import type {Metadata} from "next";

import {LegalArticleCategoryFilter} from "@/components/legal-info/LegalArticleCategoryFilter";
import {LegalArticleList} from "@/components/legal-info/LegalArticleList";
import {JsonLdScript} from "@/components/seo/JsonLdScript";
import {Container} from "@/components/ui/Container";
import {getLegalArticles} from "@/lib/content/legalArticles";
import {
  filterLegalArticles,
  parseLegalArticleCategory,
} from "@/lib/legalArticles";
import {buildBreadcrumbStructuredData} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "법률 정보 | 법률사무소 정천",
  description:
    "법률사무소 정천이 형사, 민사, 이혼·가사 등 주요 법률 쟁점을 이해하기 쉽게 정리한 법률 정보입니다.",
  alternates: {
    canonical: "/legal-info",
  },
};

type LegalInfoPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LegalInfoPage({searchParams}: LegalInfoPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const activeCategory = parseLegalArticleCategory(
    getSingleSearchParam(resolvedSearchParams.category),
  );
  const articles = filterLegalArticles(await getLegalArticles(), activeCategory);

  return (
    <main className="bg-[#FAF8F4] text-[#111B36]">
      <JsonLdScript
        id="legal-info-breadcrumb-structured-data"
        data={buildBreadcrumbStructuredData("/legal-info", [
          {name: "홈", path: "/"},
          {name: "법률 정보", path: "/legal-info"},
        ])}
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#9F7F37]">
            LEGAL JOURNAL
          </p>
          <h1 className="font-chosun mt-5 text-4xl font-normal leading-tight sm:text-5xl">
            법률 정보
          </h1>
          <p className="mt-6 text-[17px] leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            일상과 업무에서 마주할 수 있는 법률 쟁점을 차분하고 명확하게 정리합니다.
          </p>
        </header>

        <div className="mt-12 sm:mt-14">
          <LegalArticleCategoryFilter activeCategory={activeCategory} />
        </div>

        <section aria-label="법률 정보 목록" className="mt-8 sm:mt-10">
          <LegalArticleList articles={articles} />
        </section>
      </Container>
    </main>
  );
}
