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
          <span
            aria-hidden="true"
            className="relative flex h-5 w-5 items-center justify-center"
          >
            <span
              className={[
                "absolute h-0.5 w-5 bg-current transition-transform",
                isMenuOpen ? "rotate-45" : "-translate-y-1.5",
              ].join(" ")}
            />
            <span
              className={[
                "absolute h-0.5 w-5 bg-current transition-opacity",
                isMenuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute h-0.5 w-5 bg-current transition-transform",
                isMenuOpen ? "-rotate-45" : "translate-y-1.5",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 animate-[mobileOverlayIn_180ms_ease-out] bg-[#020617]/55"
          />
          <nav
            id="mobile-navigation"
            aria-label="모바일 주요 메뉴"
            className="absolute inset-y-0 right-0 w-[min(75vw,320px)] animate-[mobileDrawerIn_220ms_ease-out] bg-[#0F172A] px-6 py-7 shadow-[-20px_0_44px_rgba(2,6,23,0.28)]"
          >
            <ul className="space-y-3 text-base font-semibold text-white">
              {mobileNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      "flex min-h-14 items-center justify-between border-b border-white/12 py-3.5 transition-colors hover:text-[#C8980A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8980A]",
                      item.emphasized ? "text-[#C8980A]" : undefined,
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
