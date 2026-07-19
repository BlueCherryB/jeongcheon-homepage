import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { AttorneyProfile } from "@/data/attorney";

type AttorneyHeroProps = {
  attorney: AttorneyProfile;
};

export function AttorneyHero({ attorney }: AttorneyHeroProps) {
  const mobileHeroDescription =
    "법적 분쟁은 초기 대응이\n결과를 크게 좌우합니다. 사실관계를 면밀히 분석하고, 의뢰인이 이해할 수 있는 언어로 절차와 대응 방향을 설명드립니다.";

  return (
    <section className="bg-[#FAF8F4]">
      <Container className="pt-16 pb-0 lg:pt-15">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.65fr] lg:items-start lg:gap-12">
          <div className="pb-14 lg:pb-16 lg:pl-12">
            <div className="inline-flex flex-col items-start">
              <p className="text-xl font-semibold tracking-wide text-[#C8980A]">
                변호사 소개
              </p>
              <span
                aria-hidden="true"
                className="mt-1.5 h-px w-26 bg-[#C8980A]"
              />
            </div>

            <p className="mt-15 text-[20px] font-semibold text-[#111B36]/75">
              {attorney.role}
            </p>
            <h1 className="font-chosun mt-2 text-[44px] font-normal leading-tight tracking-[-0.02em] text-[#111B36] sm:text-[58px]">
              {attorney.name}
            </h1>

            <p className="font-chosun mt-5 whitespace-pre-line text-[28px] font-normal leading-[1.32] tracking-[-0.02em] text-[#111B36] sm:text-[30px]">
              {attorney.heroStatement}
            </p>

            <p className="mt-6 max-w-2xl whitespace-pre-line break-keep text-base leading-8 text-[#111B36]/75 sm:hidden">
              {mobileHeroDescription}
            </p>
            <p className="mt-6 hidden max-w-2xl break-keep text-lg leading-8 text-[#111B36]/75 sm:block">
              {attorney.heroDescription}
            </p>

            <div className="mt-6 flex max-w-md flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href="/#consultation"
                className="h-[52px] min-w-40 justify-center px-7"
              >
                상담 문의하기
                <span aria-hidden="true" className="ml-2 text-[#C8A96A]">
                  →
                </span>
              </Button>
              <Button
                href="/cases"
                variant="secondary"
                className="h-[52px] min-w-40 justify-center border-[#C8A96A] px-7"
              >
                수행사례 보기
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:ml-0 lg:mr-auto lg:translate-y-5">
            <div className="relative aspect-[1/1]">
              <Image
                src={attorney.imageSrc}
                alt={attorney.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center sm:object-left-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
