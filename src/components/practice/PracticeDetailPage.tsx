import Link from "next/link";

import { PracticeAreaIcon } from "@/components/practice/PracticeAreaIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { PracticeArea } from "@/data/practice";
import { practiceAreas } from "@/data/practice";

type PracticeDetailPageProps = {
  area: PracticeArea;
};

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#C8A96A]">{eyebrow}</p>
      <h2 className="font-chosun mt-3 text-[32px] font-normal tracking-[-0.02em] text-[#111B36]">
        {title}
      </h2>
    </div>
  );
}

export function PracticeDetailPage({ area }: PracticeDetailPageProps) {
  return (
    <main className="bg-white text-[#111B36]">
      <section className="bg-[#FAF8F4]">
        <Container className="py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:items-center">
            <div>
              <p className="text-base font-semibold tracking-wide text-[#C8A96A]">
                {area.eyebrow}
              </p>
              <h1 className="font-chosun mt-5 text-[46px] font-normal leading-tight tracking-[-0.02em] text-[#111B36] sm:text-[58px]">
                {area.title}
              </h1>
              <p className="mt-6 max-w-2xl break-keep text-lg leading-8 text-[#111B36]/72">
                {area.summary}
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[#E8E2D7] bg-white text-[#C8A96A] shadow-[0_18px_48px_rgba(17,27,54,0.06)]">
                <PracticeAreaIcon type={area.icon} className="h-24 w-24" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#E8E2D7] bg-white">
        <Container className="py-5">
          <nav aria-label="업무 분야 이동">
            <ul className="flex flex-wrap gap-3">
              {practiceAreas.map((item) => {
                const isActive = item.slug === area.slug;

                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "inline-flex min-w-24 items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]",
                        isActive
                          ? "border-[#111B36] bg-[#111B36] text-white"
                          : "border-[#D8D1C5] bg-white text-[#111B36] hover:border-[#C8A96A] hover:text-[#9F7F37]",
                      ].join(" ")}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-18 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
            <SectionTitle eyebrow="Overview" title="사건을 이해하는 방식" />
            <div className="space-y-5 break-keep text-base leading-8 text-[#111B36]/72">
              <p>
                이 영역에는 업무 분야별 핵심 설명이 들어갈 예정입니다. 현재는
                전체 페이지 구조와 이동 흐름을 먼저 확인하기 위한 기본 문구만
                배치합니다.
              </p>
              <p>
                상담 단계에서 쟁점과 필요한 자료를 정리하고, 의뢰인이 절차를
                이해할 수 있도록 안내합니다.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FAF8F4]">
        <Container className="py-18 lg:py-20">
          <SectionTitle eyebrow="Trust" title="전문성과 신뢰" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {["전문 분야 검토", "직접 상담", "절차별 대응"].map((item) => (
              <div key={item} className="rounded-[14px] border border-[#E8E2D7] bg-white p-6">
                <p className="text-sm font-semibold text-[#C8A96A]">{item}</p>
                <p className="mt-3 break-keep text-sm leading-7 text-[#111B36]/68">
                  세부 인증과 설명 자료는 추후 콘텐츠 단계에서 보강합니다.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-18 lg:py-20">
          <SectionTitle eyebrow="Services" title="주요 서비스" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {area.services.map((service) => (
              <div key={service} className="border-t border-[#E8E2D7] pt-5">
                <p className="font-semibold text-[#111B36]">{service}</p>
                <p className="mt-2 break-keep text-sm leading-7 text-[#111B36]/65">
                  구체적인 서비스 설명은 추후 분야별 콘텐츠와 함께 정리합니다.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#FAF8F4]">
        <Container className="py-18 lg:py-20">
          <SectionTitle eyebrow="Process" title="진행 절차" />
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {area.process.map((step, index) => (
              <li key={step} className="rounded-[14px] border border-[#E8E2D7] bg-white p-6">
                <p className="text-sm font-semibold text-[#C8A96A]">
                  0{index + 1}
                </p>
                <p className="mt-4 font-semibold text-[#111B36]">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-18 lg:py-20">
          <div className="rounded-[18px] border border-[#E8E2D7] bg-[#FAF8F4] p-8">
            <SectionTitle eyebrow="Cases" title="관련 수행사례" />
            <p className="mt-5 break-keep text-base leading-8 text-[#111B36]/70">
              분야별 대표 수행사례는 추후 Sanity 콘텐츠와 연결하여 표시할
              예정입니다.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#111B36]">
        <Container className="py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-chosun text-[32px] font-normal tracking-[-0.02em] text-white">
                지금 필요한 대응을 함께 정리하겠습니다.
              </h2>
              <p className="mt-4 max-w-2xl break-keep text-base leading-8 text-white/72">
                사건의 현재 상황을 바탕으로 가능한 선택지를 안내합니다.
              </p>
            </div>
            <Button href="/#consultation" className="h-14 border-[#C8A96A] px-7">
              상담 문의하기
              <span aria-hidden="true" className="ml-2 text-[#C8A96A]">
                →
              </span>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
