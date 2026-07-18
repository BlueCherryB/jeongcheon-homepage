"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { NavigationItem } from "@/data/navigation";
import { navigationItems } from "@/data/navigation";
import { eulyoo1945 } from "@/lib/fonts";

type MobileNavigationItem = NavigationItem & {
  emphasized?: boolean;
};

const mobileNavigationItems: MobileNavigationItem[] = [
  ...navigationItems,
  { label: "상담 예약", href: "/#consultation", emphasized: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:hidden">
        <Link
          href="/"
          aria-label="법률사무소 정천 홈으로 이동"
          className="flex shrink-0 items-center gap-1.5 text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F172A]"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="whitespace-nowrap text-[15px] font-semibold leading-none sm:text-base">
            법률사무소
          </span>
          <span
            className={`${eulyoo1945.className} whitespace-nowrap text-[32px] font-normal leading-none tracking-[-0.03em]`}
          >
            정천
          </span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2D7] text-[#0F172A] transition-colors hover:border-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
        >
          <span className="sr-only">{isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-16 z-50 border-y border-[#E8E2D7] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] md:hidden"
        >
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2D7] text-2xl leading-none text-[#0F172A] transition-colors hover:border-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
            >
              <span className="sr-only">메뉴 닫기</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="모바일 주요 메뉴">
            <ul className="space-y-2 text-base font-semibold text-[#0F172A]">
              {mobileNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      "flex min-h-12 items-center justify-between border-b border-[#E8E2D7] px-1 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]",
                      item.emphasized ? "text-[#9F7F37]" : undefined,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>{item.label}</span>
                    {item.emphasized ? (
                      <span aria-hidden="true" className="text-xl">
                        →
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}

      <div className="mx-auto hidden w-full max-w-6xl flex-col gap-6 px-6 py-5 md:flex lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          aria-label="법률사무소 정천 홈으로 이동"
          className="flex shrink-0 items-center gap-1.5 text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F172A]"
        >
          <span className="whitespace-nowrap text-[15px] font-semibold leading-none sm:text-base">
            법률사무소
          </span>
          <span
            className={`${eulyoo1945.className} whitespace-nowrap text-[34px] font-normal leading-none tracking-[-0.03em] sm:text-4xl`}
          >
            정천
          </span>
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <nav aria-label="주요 메뉴">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-zinc-800">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F172A]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="/#consultation" className="w-fit px-6 py-3">
            상담 예약
          </Button>
        </div>
      </div>
    </header>
  );
}
