import type { ReactNode } from "react";

type CaseDetailSectionProps = {
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
  icon,
  title,
  children,
}: CaseDetailSectionProps) {
  return (
    <section className="grid gap-6 border-b border-[#E8E2D7] py-12 last:border-b-0 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10">
      <div className="flex items-center gap-4 md:block md:border-r md:border-[#E8E2D7] md:pr-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E2D7] bg-[#FAF8F4] text-[#C8A96A]">
          <SectionIcon icon={icon} />
        </div>
        <h2 className="font-chosun break-keep text-xl font-normal tracking-[-0.02em] text-[#111B36] md:mt-5">
          {title}
        </h2>
      </div>

      <div className="max-w-3xl text-base leading-8 text-[#111B36]/78 sm:text-lg">
        {children}
      </div>
    </section>
  );
}
