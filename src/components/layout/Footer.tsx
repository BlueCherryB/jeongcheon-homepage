import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { officeContact } from "@/data/contact";
import { eulyoo1945 } from "@/lib/fonts";

type FooterIcon = "location" | "phone";

const currentYear = new Date().getFullYear();

function FooterInfoIcon({ icon }: { icon: FooterIcon }) {
  if (icon === "phone") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
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

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
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

function FooterColumn({
  icon,
  title,
  children,
}: {
  icon: FooterIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-[#E8E2D7] pt-8 md:border-l md:pl-8 lg:pt-0">
      <div className="flex items-center gap-3 text-[#111B36]">
        <span className="text-[#C8A96A]">
          <FooterInfoIcon icon={icon} />
        </span>
        <p className="font-semibold">{title}</p>
      </div>
      <div className="mt-5 space-y-2 text-sm leading-7 text-[#111B36]/75">
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#E8E2D7] bg-[#FAF8F4]">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.5fr_1.25fr_1fr] lg:gap-10">
          <div>
            <div className="flex items-end gap-2 text-[#111B36]">
              <span
                className={`${eulyoo1945.className} text-3xl font-normal leading-none tracking-[-0.03em]`}
              >
                정천
              </span>
              <span className="pb-0.5 text-lg font-semibold leading-none">
                법률사무소
              </span>
            </div>
            <p className="mt-7 break-keep text-sm leading-7 text-[#111B36]/72">
              의뢰인의 권익을 지키고
              <br />
              최선의 결과를 이끌어냅니다.
            </p>
          </div>

          <div aria-hidden="true" className="hidden lg:block" />

          <FooterColumn icon="location" title="주소">
            <a
              href={officeContact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 지도에서 법률사무소 정천 주소 보기"
              className="block break-keep hover:text-[#9F7F37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
            >
              {officeContact.address}
            </a>
            <p>{officeContact.addressDetail}</p>
          </FooterColumn>

          <FooterColumn icon="phone" title="연락처">
            <a
              href={officeContact.phoneHref}
              className="block hover:text-[#9F7F37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
            >
              {officeContact.phoneDisplay}
            </a>
            <a
              href={officeContact.emailHref}
              className="block break-all hover:text-[#9F7F37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
            >
              {officeContact.email}
            </a>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-[#E8E2D7] pt-6 text-sm text-[#111B36]/65 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} 정천 법률사무소. All rights reserved.</p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>개인정보처리방침</li>
              <li className="hidden text-[#E8E2D7] md:block" aria-hidden="true">
                |
              </li>
              <li>이용약관</li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
