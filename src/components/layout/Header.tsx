import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { navigationItems } from "@/data/navigation";
import { eulyoo1945 } from "@/lib/fonts";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          aria-label="법률사무소 정천 홈으로 이동"
          className="flex shrink-0 items-center gap-1.5 text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F172A]"
        >
          <span className="whitespace-nowrap text-[13px] font-semibold leading-none sm:text-sm">
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
