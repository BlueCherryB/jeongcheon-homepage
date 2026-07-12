import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function CasesPageHero() {
  return (
    <section className="overflow-hidden border-b border-[#E8E2D7] bg-[#FAF8F4]">
      <Container className="relative py-16 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[#111B36]/70">
            <ol className="flex items-center gap-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#C8A96A]">
                ›
              </li>
              <li aria-current="page" className="font-medium text-[#111B36]">
                수행사례
              </li>
            </ol>
          </nav>

          <h1 className="font-chosun mt-7 text-[44px] font-normal leading-tight tracking-[-0.02em] text-[#111B36] sm:text-[56px]">
            수행사례
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#111B36]/80 sm:text-lg">
            정천이 의뢰인의 권익을 지키고 최선의 결과를 이끌어낸 사례를 소개합니다.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden h-52 w-[42%] -translate-y-1/2 lg:block"
        >
          <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(250,248,244,0)_0%,rgba(255,255,255,0.72)_38%,rgba(250,248,244,0)_100%)]" />
          <div className="absolute bottom-9 right-12 h-px w-72 bg-[#C8A96A]/40" />
          <div className="absolute bottom-16 right-20 h-px w-56 bg-[#111B36]/10" />
          <div className="absolute bottom-[5.75rem] right-28 h-px w-64 bg-[#111B36]/10" />
          <div className="absolute right-8 top-4 h-36 w-36 rounded-full border border-[#C8A96A]/45" />
          <div className="absolute right-20 top-12 h-16 w-16 rounded-full border border-[#C8A96A]/35" />
        </div>
      </Container>
    </section>
  );
}
