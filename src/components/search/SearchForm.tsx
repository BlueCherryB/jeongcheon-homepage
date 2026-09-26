"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { buildSearchHref, normalizeSearchQuery } from "@/lib/search";

type SearchFormProps = {
  defaultValue?: string;
  variant?: "hero" | "results";
};

export function SearchForm({
  defaultValue = "",
  variant = "results",
}: SearchFormProps) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = normalizeSearchQuery(formData.get("q"));

    if (!query) {
      return;
    }

    router.push(buildSearchHref(query));
  }

  const isHero = variant === "hero";

  return (
    <form
      action="/search"
      method="get"
      role="search"
      onSubmit={handleSubmit}
      className={[
        "flex w-full items-stretch border border-[#D8D1C5] bg-white focus-within:border-[#0F172A] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#C8A96A]",
        isHero
          ? "w-full"
          : "max-w-3xl",
      ].join(" ")}
    >
      <label htmlFor={`site-search-${variant}`} className="sr-only">
        사이트 검색
      </label>
      <input
        id={`site-search-${variant}`}
        name="q"
        type="search"
        defaultValue={defaultValue}
        maxLength={80}
        placeholder="사건명, 혐의명 또는 궁금한 내용을 검색해보세요."
        className={[
          "min-w-0 flex-1 bg-transparent px-4 text-[#111B36] outline-none placeholder:text-zinc-400 sm:px-5",
          isHero ? "h-14 text-[15px] sm:h-16 sm:text-base" : "h-13 text-sm sm:text-base",
        ].join(" ")}
      />
      <button
        type="submit"
        aria-label="검색"
        className={[
          "shrink-0 bg-[#0F172A] px-5 font-semibold text-white transition-colors hover:bg-[#17213A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]",
          isHero ? "min-w-16 sm:min-w-20" : "min-w-16",
        ].join(" ")}
      >
        검색
      </button>
    </form>
  );
}
