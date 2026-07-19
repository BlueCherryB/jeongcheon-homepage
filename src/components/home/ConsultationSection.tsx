import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { officeContact } from "@/data/contact";

type ConsultationIcon = "phone" | "location";

type ConsultationInfoItemProps = {
  icon: ConsultationIcon;
  label: string;
  value: string;
  href?: string;
  supportingText?: string;
};

function InfoIcon({ icon }: { icon: ConsultationIcon }) {
  if (icon === "location") {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M8 4 5.5 6.5c-.4.4-.6 1-.4 1.6 1.1 4.9 5 8.8 9.8 9.8.6.1 1.2 0 1.6-.4L19 15l-4-3-2 2c-1.4-.7-2.5-1.8-3-3l2-2-4-5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ConsultationInfoItem({
  icon,
  label,
  value,
  href,
  supportingText,
}: ConsultationInfoItemProps) {
  return (
    <div className="flex gap-4 border-b border-[#E8E2D7] py-5 last:border-b-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E8E2D7] bg-[#FAF8F4] text-[#C8A96A]">
        <InfoIcon icon={icon} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#C8A96A]">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-1 block break-words text-lg font-semibold text-[#111B36] hover:text-[#9F7F37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 break-keep text-lg font-semibold text-[#111B36]">
            {value}
          </p>
        )}
        {supportingText ? (
          <p className="mt-1 text-sm leading-6 text-[#111B36]/65">
            {supportingText}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ConsultationSection() {
  return (
    <section id="consultation" className="scroll-mt-8 bg-[#FAF8F4]">
      <Container className="py-24 lg:py-28">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
              상담 안내
            </p>
            <span
              aria-hidden="true"
              className="mt-2.5 h-px w-28 bg-[#C8A96A]"
            />
          </div>
          <p className="mx-auto mt-5 max-w-xl break-keep text-base leading-7 text-[#111B36]/70">
            의뢰인의 상황에 맞는 최적의 해결책을 제시해드립니다.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-stretch">
          <div className="flex h-full flex-col justify-center rounded-[22px] border border-[#E8E2D7] bg-white px-7 py-8 shadow-[0_18px_54px_rgba(17,27,54,0.05)] sm:px-8 lg:py-10">
            <div>
              <ConsultationInfoItem
                icon="phone"
                label="전화 상담"
                value={officeContact.phoneDisplay}
                href={officeContact.phoneHref}
              />
              <ConsultationInfoItem
                icon="location"
                label="주소"
                value={officeContact.address}
                supportingText={officeContact.addressDetail}
              />
            </div>

            <div className="mt-7 flex flex-col">
              <Button
                href={officeContact.phoneHref}
                className="h-14 px-6 text-xl font-semibold max-sm:w-full sm:text-lg"
              >
                상담 문의하기
                <span aria-hidden="true" className="ml-2 text-[#C8A96A]">
                  →
                </span>
              </Button>
            </div>
          </div>

          <div className="flex h-full flex-col">
            <a
              href={officeContact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 지도에서 법률사무소 정천 위치 보기"
              className="group block rounded-[22px] border border-[#E8E2D7] bg-white p-3 shadow-[0_18px_54px_rgba(17,27,54,0.06)] transition-colors hover:border-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] lg:flex-1"
            >
              <div className="relative aspect-[1147/1372] overflow-hidden rounded-[16px] bg-[#F3EEE6] sm:hidden">
                <Image
                  src="/images/map-jeong-cheon-mobile.png"
                  alt={officeContact.mapImage.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative hidden aspect-[3/2] overflow-hidden rounded-[16px] bg-[#F3EEE6] sm:block lg:h-full lg:aspect-auto">
                <Image
                  src={officeContact.mapImage.src}
                  alt={officeContact.mapImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
              </div>
            </a>
            <p className="mt-3 text-sm text-[#111B36]/60">
              지도를 클릭하시면 네이버 지도로 이동합니다.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
