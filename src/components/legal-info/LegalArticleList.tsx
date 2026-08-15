import Image from "next/image";
import Link from "next/link";

import {getSanityImageUrl} from "@/lib/cms/sanityImage";
import type {LegalArticleListItem} from "@/types/content/legalArticle";

type LegalArticleListProps = {
  articles: LegalArticleListItem[];
};

export function LegalArticleList({articles}: LegalArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="border-y border-[#E8E2D7] py-16 text-center text-[#111B36]/65">
        해당 분야의 법률 정보가 아직 없습니다.
      </p>
    );
  }

  return (
    <div className="border-t border-[#D8D1C5]">
      {articles.map((article) => {
        const imageUrl = getSanityImageUrl(article.coverImage, {
          width: 480,
          quality: 82,
        });

        return (
          <article key={article.slug} className="border-b border-[#E8E2D7]">
            <Link
              href={`/legal-info/${article.slug}`}
              className={[
                "group grid gap-5 py-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] sm:py-10",
                imageUrl
                  ? "md:grid-cols-[minmax(0,1fr)_176px] md:items-center md:gap-10"
                  : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 text-sm font-semibold text-[#9F7F37]">
                  <span>{article.categoryLabel}</span>
                  <span aria-hidden="true" className="h-px w-7 bg-[#C8A96A]" />
                  <time dateTime={article.publishedAt} className="text-[#111B36]/55">
                    {article.displayDate}
                  </time>
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-snug text-[#111B36] transition-colors group-hover:text-[#9F7F37] sm:text-[28px]">
                  {article.title}
                </h2>
                <p
                  className={[
                    "mt-4 line-clamp-3 text-[15px] leading-7 text-zinc-600 sm:line-clamp-2 sm:text-base",
                    imageUrl ? "max-w-3xl" : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {article.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#111B36] transition-colors group-hover:text-[#C8980A]">
                  자세히 보기
                  <span
                    aria-hidden="true"
                    className="ml-2 text-xl leading-none transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>

              {imageUrl ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#E8E2D7] bg-[#FAF8F4]">
                  <Image
                    src={imageUrl}
                    alt={article.coverImage?.alt ?? "법률 정보 표지 이미지"}
                    fill
                    sizes="(min-width: 768px) 176px, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
