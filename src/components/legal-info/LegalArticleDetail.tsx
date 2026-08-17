import Image from "next/image";

import {PortableTextContent} from "@/components/cases/PortableTextContent";
import {Container} from "@/components/ui/Container";
import {getSanityImageUrl} from "@/lib/cms/sanityImage";
import type {LegalArticleDetail as LegalArticleDetailType} from "@/types/content/legalArticle";

type LegalArticleDetailProps = {
  article: LegalArticleDetailType;
};

export function LegalArticleDetail({article}: LegalArticleDetailProps) {
  const imageUrl = getSanityImageUrl(article.coverImage, {
    width: 1440,
    quality: 85,
  });

  return (
    <main className="bg-white text-[#111B36]">
      <Container className="py-16 sm:py-20 lg:py-24">
        <article className="mx-auto max-w-4xl">
          <header className="border-b border-[#E8E2D7] pb-10 sm:pb-12">
            <div className="text-sm font-semibold text-[#9F7F37]">
              <span>{article.categoryLabel}</span>
            </div>
            <h1 className="font-chosun mt-5 text-3xl font-normal leading-[1.4] sm:text-4xl lg:text-[44px]">
              {article.title}
            </h1>
          </header>

          {imageUrl ? (
            <figure className="relative mt-10 aspect-[16/9] overflow-hidden rounded-md bg-[#FAF8F4] sm:mt-12">
              <Image
                src={imageUrl}
                alt={article.coverImage?.alt ?? "법률 정보 표지 이미지"}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </figure>
          ) : null}

          <div className="pt-10 sm:pt-12">
            <PortableTextContent value={article.body} variant="article" />
          </div>

          {article.source?.platform || article.source?.url ? (
            <footer className="mt-12 border-t border-[#E8E2D7] pt-6 text-sm leading-6 text-[#111B36]/65">
              <span className="font-semibold text-[#111B36]">출처</span>
              {article.source.platform ? <span className="ml-2">{article.source.platform}</span> : null}
              {article.source.url ? (
                <a
                  href={article.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-3 font-semibold text-[#9F7F37] underline decoration-[#C8A96A]/60 underline-offset-4 hover:text-[#C8980A]"
                >
                  원문 보기
                </a>
              ) : null}
            </footer>
          ) : null}
        </article>
      </Container>
    </main>
  );
}
