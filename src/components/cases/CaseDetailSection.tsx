import type { ReactNode } from "react";

type CaseDetailSectionProps = {
  number: number;
  title: string;
  children: ReactNode;
};

export function CaseDetailSection({
  number,
  title,
  children,
}: CaseDetailSectionProps) {
  return (
    <section className="grid gap-4 border-b border-[#E8E2D7] py-8 last:border-b-0 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <div className="lg:block lg:border-r lg:border-[#E8E2D7] lg:pr-7">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="shrink-0 text-base font-semibold text-[#C8A96A]">
            {String(number).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[#D9C89E]" />
          <h2 className="font-chosun min-w-0 break-words text-[22px] font-semibold leading-snug text-[#18181B] lg:text-xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="min-w-0 max-w-[720px] text-base leading-[1.85] text-[#27272A] sm:text-[17px] lg:leading-8">
        {children}
      </div>
    </section>
  );
}
