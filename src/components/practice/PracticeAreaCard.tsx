import Link from "next/link";

import { PracticeAreaIcon } from "@/components/practice/PracticeAreaIcon";
import type { PracticeArea } from "@/data/practice";

type PracticeAreaCardProps = {
  area: PracticeArea;
  large?: boolean;
};

export function PracticeAreaCard({ area, large = false }: PracticeAreaCardProps) {
  return (
    <article
      className={[
        "group flex flex-col rounded-[22px] border border-[#E8E2D7] bg-white shadow-[0_18px_50px_rgba(17,27,54,0.07)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-[#C8A96A]/70 hover:shadow-[0_24px_70px_rgba(17,27,54,0.12)]",
        large ? "min-h-[500px] px-9 py-11" : "min-h-[470px] px-10 py-12",
      ].join(" ")}
    >
      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#F3EEE6] text-[#C8A96A]">
        <PracticeAreaIcon type={area.icon} />
      </div>

      <span aria-hidden="true" className="mx-auto mt-7 h-px w-14 bg-[#C8A96A]" />

      <h3 className="font-chosun mt-6 text-center text-[36px] font-normal leading-tight tracking-[-0.02em] text-[#111B36]">
        {area.title}
      </h3>

      {large ? (
        <p className="mt-5 break-keep text-center text-sm leading-7 text-[#111B36]/68">
          {area.summary}
        </p>
      ) : null}

      <span aria-hidden="true" className="mt-8 h-px w-full bg-[#C8A96A]/55" />

      <ul className="mt-6">
        {area.services.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-4 border-b border-[#E8E2D7]/70 py-3.5 text-base font-medium text-[#111B36] last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C8A96A] text-sm leading-none text-[#C8A96A]"
            >
              ✓
            </span>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      <Link
        href={area.href}
        className="group/link mx-auto mt-auto inline-flex translate-y-3 items-center justify-center px-0 pb-3 pt-4 text-base font-semibold text-[#111B36] transition-colors hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A]"
      >
        <span>자세히 보기</span>
        <span
          aria-hidden="true"
          className="ml-3 text-[#C8A96A] transition-transform group-hover/link:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  );
}
