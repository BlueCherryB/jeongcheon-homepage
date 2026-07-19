import Image from "next/image";
import Link from "next/link";

import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { AttorneyProfile, AttorneyTimelineItem } from "@/data/attorney";
import type { CaseStudyListItem } from "@/types/content/caseStudy";

type AttorneySectionsProps = {
  attorney: AttorneyProfile;
  representativeCases: CaseStudyListItem[];
};

function SmallIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8E2D7] bg-[#FAF8F4] text-[#C8A96A]"
    >
      ✓
    </span>
  );
}

function CredentialIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A96A] bg-white sm:h-14 sm:w-14"
    >
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        className="h-6 w-6 sm:h-8 sm:w-8"
      />
    </span>
  );
}

function TimelineList({ items }: { items: AttorneyTimelineItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={`${item.label}-${item.period ?? ""}`} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A96A]"
          />
          <div>
            <p
              className={[
                "font-medium text-[#111B36]",
                item.highlight ? "text-lg font-bold" : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
              {item.current ? (
                <span className="ml-2 text-xs font-semibold text-[#C8A96A]">
                  현재
                </span>
              ) : null}
            </p>
            {item.period ? (
              <p className="mt-1 text-sm text-[#111B36]/60">{item.period}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AttorneySections({
  attorney,
  representativeCases,
}: AttorneySectionsProps) {
  return (
    <>
      <section className="relative">
        <Container className="pt-0 pb-12">
          <div className="grid grid-cols-3 overflow-hidden rounded-[22px] border border-[#E8E2D7] bg-white shadow-[0_18px_54px_rgba(17,27,54,0.05)] sm:grid-cols-2 lg:grid-cols-6">
            {attorney.credentials.map((credential) => (
              <div
                key={credential.id}
                className="flex min-h-33 flex-col items-center border-b border-r border-[#E8E2D7] px-2 py-4 text-center last:border-r-0 sm:min-h-0 sm:px-5 sm:py-7 lg:border-b-0"
              >
                <CredentialIcon src={credential.iconSrc} />
                <p className="mt-3 text-sm font-bold leading-snug text-[#111B36] sm:mt-4 sm:text-base">
                  {credential.label}
                </p>
                {credential.year ? (
                  <div className="mt-1.5 space-y-0.5 sm:mt-2 sm:space-y-1">
                    <p className="text-[11px] font-semibold leading-snug text-[#111B36]/58 sm:text-xs">
                      자격 취득
                    </p>
                    <p className="text-xs font-semibold text-[#111B36]/70 sm:text-sm">
                      ({credential.year})
                    </p>
                  </div>
                ) : null}
                {credential.note ? (
                  <p className="mt-1 text-[11px] font-semibold leading-snug text-[#111B36]/60 sm:text-xs">
                    {credential.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/*
      <section className="bg-[#FAF8F4]">
        <Container className="py-20">
          <h2 className="font-chosun text-[36px] font-normal tracking-[-0.02em] text-[#111B36]">
            {attorney.greetingTitle}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {attorney.greetingParagraphs.map((paragraph, index) => (
              <div
                key={paragraph}
                className="rounded-[18px] border border-[#E8E2D7] bg-white p-6"
              >
                <p className="text-sm font-semibold text-[#C8A96A]">
                  0{index + 1}
                </p>
                <p className="mt-4 break-keep leading-8 text-[#111B36]/78">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
          <blockquote className="mt-8 rounded-[22px] border border-[#E8E2D7] bg-white px-8 py-7 text-center">
            <p className="font-chosun text-[28px] font-normal leading-[1.45] tracking-[-0.02em] text-[#111B36]">
              구조와 맥락부터 이해하고, 결과를 함께 만들어가는 말을
              전합니다.
            </p>
          </blockquote>
        </Container>
      </section>
      */}

      <section className="bg-white">
        <Container className="py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="pt-4 sm:pt-0">
              <h2 className="font-chosun text-3xl font-normal text-[#111B36]">
                학력
              </h2>
              <div className="mt-6 border-t border-[#E8E2D7] pt-6">
                <TimelineList items={attorney.education} />
              </div>
            </div>
            <div className="pt-6 sm:pt-0">
              <h2 className="font-chosun text-3xl font-normal text-[#111B36]">
                자격
              </h2>
              <div className="mt-6 border-t border-[#E8E2D7] pt-6">
                <TimelineList items={attorney.qualifications} />
              </div>
            </div>
            <div>
              <h2 className="font-chosun text-3xl font-normal text-[#111B36]">
                주요 경력
              </h2>
              <div className="mt-6 border-t border-[#E8E2D7] pt-6">
                <TimelineList items={attorney.careers} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {representativeCases.length > 0 ? (
        <section className="bg-[#FAF8F4]">
          <Container className="py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-chosun text-[36px] font-normal tracking-[-0.02em] text-[#111B36]">
                대표 수행사례
              </h2>
              <Link
                href="/cases"
                className="text-sm font-semibold text-[#111B36] hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]"
              >
                더 많은 수행사례 보기 →
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {representativeCases.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-white">
        <Container className="py-20">
          <h2 className="font-chosun text-[36px] font-normal tracking-[-0.02em] text-[#111B36]">
            업무 원칙
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {attorney.principles.map((principle) => (
              <div key={principle.title} className="border-t border-[#E8E2D7] pt-6">
                <SmallIcon />
                <h3 className="mt-4 font-semibold text-[#111B36]">
                  {principle.title}
                </h3>
                <p className="mt-3 break-keep text-sm leading-7 text-[#111B36]/68">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#111B36]">
        <Container className="py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-chosun text-[32px] font-normal tracking-[-0.02em] text-white">
                지금, 당신의 문제를 함께 해결하겠습니다.
              </h2>
              <p className="mt-4 max-w-2xl break-keep text-base leading-8 text-white/72">
                정천은 의뢰인의 상황에 맞는 최선의 해결책을 제시합니다.
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
    </>
  );
}
