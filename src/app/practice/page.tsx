import type { Metadata } from "next";

import { PracticeAreaCard } from "@/components/practice/PracticeAreaCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { practiceAreas } from "@/data/practice";

export const metadata: Metadata = {
  title: "업무 분야 | 법률사무소 정천",
  description:
    "법률사무소 정천의 형사, 민사, 이혼·가사 업무 분야 안내 페이지입니다.",
  alternates: {
    canonical: "/practice",
  },
};

export default function PracticePage() {
  return (
    <main className="bg-[#FAF8F4] text-[#111B36]">
      <section>
        <Container className="py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
                업무 분야
              </p>
              <span aria-hidden="true" className="mt-2.5 h-px w-28 bg-[#C8A96A]" />
            </div>

            <SectionHeading
              level={1}
              title="의뢰인의 상황에 맞는 법률 대응을 준비합니다."
              description="형사, 민사, 이혼·가사 사건의 기본 구조와 상담 흐름을 확인하실 수 있습니다."
              titleClassName="font-chosun mx-auto mt-10 max-w-4xl text-[34px] font-normal leading-[1.35] tracking-[-0.02em] text-[#111B36] sm:text-[44px] lg:text-[52px]"
              descriptionClassName="mx-auto mt-6 max-w-2xl break-keep text-base leading-8 text-[#111B36]/72 sm:text-lg"
            />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <PracticeAreaCard key={area.slug} area={area} large />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
