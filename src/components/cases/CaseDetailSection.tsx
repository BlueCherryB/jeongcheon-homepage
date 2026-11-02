import type { ReactNode } from "react";

import { MobileCaseSectionNumber } from "@/components/cases/MobileCaseSectionNumber";

type CaseDetailSectionProps = {
  number: number;
  icon: "document" | "search" | "shield" | "result";
  title: string;
  children: ReactNode;
};

function SectionIcon({ icon }: { icon: CaseDetailSectionProps["icon"] }) {
  if (icon === "search") {
    return (
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 32 32">
        <path
          d="m22 22 6 6M14 24c5.523 0 10-4.477 10-10S19.523 4 14 4 4 8.477 4 14s4.477 10 10 10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 32 32">
        <path
          d="M16 3 6 7v8c0 6.5 4.1 11 10 14 5.9-3 10-7.5 10-14V7L16 3Zm-5 13 3.2 3.2L21 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (icon === "result") {
    return (
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 32 32">
        <path
          d="M9 7h14M12 7v18M20 7v18M8 25h16M16 10l-6 9h12l-6-9Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 32 32">
      <path
        d="M9 4h10l4 4v20H9V4Zm10 0v5h5M13 14h8M13 19h8M13 24h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function CaseDetailSection({
  number,
  icon,
  title,
  children,
}: CaseDetailSectionProps) {
  return (
    <section className="grid gap-4 border-b border-[#E8E2D7] py-8 last:border-b-0 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <div className="flex min-w-0 items-center gap-3 lg:block lg:border-r lg:border-[#E8E2D7] lg:pr-7">
        <MobileCaseSectionNumber number={number} />
        <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#E8E2D7] bg-[#FAF8F4] text-[#C8A96A] lg:flex">
          <SectionIcon icon={icon} />
        </div>
        <h2 className="font-chosun min-w-0 break-words text-[22px] font-semibold leading-snug text-[#18181B] lg:mt-5 lg:break-keep lg:text-xl lg:leading-7 lg:tracking-[-0.02em]">
          {title}
        </h2>
      </div>

      <div className="min-w-0 max-w-[720px] text-base leading-[1.85] text-[#27272A] sm:text-[17px] lg:leading-8">
        {children}
      </div>
    </section>
  );
}
