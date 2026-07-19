import Link from "next/link";

import { PracticeAreaIcon } from "@/components/practice/PracticeAreaIcon";
import type { PracticeArea } from "@/data/practice";

type PracticeAreaCardProps = {
  area: PracticeArea;
  large?: boolean;
};

export function PracticeAreaCard({ area, large = false }: PracticeAreaCardProps) {
  return (
    <Link
      href={area.href}
      aria-label={`${area.title} 업무 분야 자세히 보기`}
      className={[
        "group flex flex-col rounded-[22px] border border-[#E8E2D7] bg-white shadow-[0_18px_50px_rgba(17,27,54,0.07)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-[#C8A96A]/70 hover:shadow-[0_24px_70px_rgba(17,27,54,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A]",
        large
          ? "min-h-[430px] px-7 py-8 sm:min-h-[500px] sm:px-9 sm:py-11"
          : "min-h-[410px] px-7 py-8 sm:min-h-[470px] sm:px-10 sm:py-12",
      ].join(" ")}
    >
      <article className="flex h-full flex-col">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F3EEE6] text-[#C8A96A] sm:h-32 sm:w-32">
          <PracticeAreaIcon
            type={area.icon}
            className="h-12 w-12 sm:h-16 sm:w-16"
          />
        </div>

        <span
          aria-hidden="true"
          className="mx-auto mt-5 h-px w-14 bg-[#C8A96A] sm:mt-7"
        />

        <h3 className="font-chosun mt-4 text-center text-[36px] font-normal leading-tight tracking-[-0.02em] text-[#111B36] sm:mt-6">
          {area.title}
        </h3>

        {large ? (
          <p className="mt-4 break-keep text-center text-sm leading-7 text-[#111B36]/68 sm:mt-5">
            {area.summary}
          </p>
        ) : null}

        <span
          aria-hidden="true"
          className="mt-6 h-px w-full bg-[#C8A96A]/55 sm:mt-8"
        />

        <ul className="mt-4 sm:mt-6">
          {area.services.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3 border-b border-[#E8E2D7]/70 py-2.5 text-base font-medium text-[#111B36] last:border-b-0 sm:gap-4 sm:py-3.5"
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

        <span className="mx-auto mt-auto inline-flex translate-y-2 items-center justify-center px-0 pb-2 pt-5 text-lg font-semibold text-[#C8980A] transition-colors sm:translate-y-3 sm:pb-3 sm:pt-4 sm:text-base sm:text-[#111B36] group-hover:text-[#C8980A]">
          <span>자세히 보기</span>
          <span
            aria-hidden="true"
            className="ml-3 text-xl text-[#C8980A] transition-transform group-hover:translate-x-1.5 sm:text-lg"
          >
            →
          </span>
        </span>
      </article>
    </Link>
  );
}
