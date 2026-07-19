import Link from "next/link";
import Image from "next/image";

import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { PracticeAreaIcon } from "@/components/practice/PracticeAreaIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { PracticeArea } from "@/data/practice";
import {
  civilCertificateAssetPath,
  criminalCertificateAssetPath,
  practiceAreas,
} from "@/data/practice";
import { buildCasesHref } from "@/lib/cases";
import type { CaseStudyListItem } from "@/types/content/caseStudy";

type PracticeDetailPageProps = {
  area: PracticeArea;
  relatedCases: CaseStudyListItem[];
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

const certificateByPracticeSlug = {
  criminal: {
    heading: "대한변호사협회 '형사법' 전문분야 등록",
    imageSrc: criminalCertificateAssetPath,
    imageAlt: "김찬협 변호사 대한변호사협회 형사법 전문분야 등록증서",
  },
  civil: {
    heading: "대한변호사협회 '민사법' 전문분야 등록",
    imageSrc: civilCertificateAssetPath,
    imageAlt: "김찬협 변호사 대한변호사협회 민사법 전문분야 등록증서",
  },
} as const;

function CertificateSection({ area }: { area: PracticeArea }) {
  const certificate =
    area.slug === "criminal" || area.slug === "civil"
      ? certificateByPracticeSlug[area.slug]
      : null;

  if (!certificate) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl border-t border-[#E8E2D7] pt-8 text-center">
      <h3 className="font-chosun text-[26px] font-normal tracking-[-0.02em] text-[#111B36]">
        {certificate.heading}
      </h3>
      <div className="mx-auto mt-6 w-full max-w-[380px] overflow-hidden rounded-[12px] border border-[#E8E2D7] bg-white p-2 shadow-[0_14px_34px_rgba(17,27,54,0.08)] sm:max-w-[440px]">
        <Image
          src={certificate.imageSrc}
          alt={certificate.imageAlt}
          width={744}
          height={1039}
          className="h-auto w-full rounded-[8px] object-contain"
          sizes="(min-width: 640px) 440px, 100vw"
        />
      </div>
    </div>
  );
}

export function PracticeDetailPage({
  area,
  relatedCases,
}: PracticeDetailPageProps) {
  const casesHref = buildCasesHref({ category: area.category, page: 1 });

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
            <div className="hidden justify-start sm:flex lg:justify-end">
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
              <h2 className="font-chosun text-[25px] font-normal leading-[1.55] tracking-[-0.02em] text-[#111B36] sm:text-[28px] sm:leading-normal">
                {area.introductionTitle}
              </h2>
              {area.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FAF8F4]">
        <Container className="py-18 lg:py-20">
          <SectionTitle eyebrow="Trust" title="전문성과 신뢰" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {area.trustItems.map((item) => (
              <div key={item.title} className="rounded-[14px] border border-[#E8E2D7] bg-white p-6">
                <p className="text-sm font-semibold text-[#C8A96A]">{item.title}</p>
                <p className="mt-3 break-keep text-sm leading-7 text-[#111B36]/68">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <CertificateSection area={area} />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-18 lg:py-20">
          <SectionTitle eyebrow="Services" title="주요 서비스" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {area.services.map((service) => (
              <div key={service.title} className="border-t border-[#E8E2D7] pt-5">
                <p className="font-semibold text-[#111B36]">{service.title}</p>
                <p className="mt-2 break-keep text-sm leading-7 text-[#111B36]/65">
                  {service.description}
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
              <li key={step.title} className="rounded-[14px] border border-[#E8E2D7] bg-white p-6">
                <p className="text-sm font-semibold text-[#C8A96A]">
                  0{index + 1}
                </p>
                <p className="mt-4 font-semibold text-[#111B36]">{step.title}</p>
                <p className="mt-3 break-keep text-sm leading-7 text-[#111B36]/65">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {relatedCases.length > 0 ? (
        <section className="bg-white">
          <Container className="py-18 lg:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionTitle eyebrow="Cases" title="관련 수행사례" />
              <Link
                href={casesHref}
                className="text-sm font-semibold text-[#111B36] hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]"
              >
                {area.title} 사례 더 보기 →
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {relatedCases.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-[#111B36]">
        <Container className="py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-chosun text-[32px] font-normal tracking-[-0.02em] text-white">
                {area.ctaTitle}
              </h2>
              <p className="mt-4 max-w-2xl break-keep text-base leading-8 text-white/72">
                {area.ctaDescription}
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
