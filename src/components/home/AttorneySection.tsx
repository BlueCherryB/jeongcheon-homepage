import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";

export function AttorneySection() {
  const { attorney } = homepageContent;

  return (
    <section id={attorney.id} className="bg-[#FAFAF8]">
      <Container className="py-16 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.47fr_0.53fr] lg:items-start lg:gap-20">
          <div className="relative max-w-xl lg:mt-14 lg:max-w-[34rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-zinc-100">
              <Image
                src={attorney.image.src}
                alt={attorney.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </div>

          <div>
            <div className="inline-flex flex-col items-start">
              <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
                {attorney.eyebrow}
              </p>
              <span
                aria-hidden="true"
                className="mt-0.5 h-px w-30 bg-[#C8A96A]"
              />
            </div>

            <h2 className="font-chosun mt-5 text-[44px] font-normal leading-tight tracking-[-0.02em] text-[#0F172A] sm:mt-6 sm:text-[54px]">
              {attorney.name}
            </h2>

            <blockquote className="relative mt-7 sm:mt-10">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-5 font-chosun text-5xl leading-none text-[#C8A96A] sm:-top-6 sm:text-6xl"
              >
                “
              </span>
              <p className="font-chosun whitespace-pre-line text-[36px] font-normal leading-[1.32] tracking-[-0.02em] text-[#020617] sm:text-[30px] sm:leading-[1.42]">
                {attorney.quote}
              </p>
            </blockquote>

            <p className="mt-5 max-w-xl whitespace-pre-line text-[17px] leading-[1.7] text-zinc-700 sm:mt-6 sm:text-lg sm:leading-[1.75]">
              {attorney.description}
            </p>

            <div className="mt-6 border-y border-[#C8A96A]/25 sm:mt-8">
              {attorney.strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="flex gap-3.5 border-b border-[#C8A96A]/20 py-3.5 last:border-b-0 sm:gap-4 sm:py-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-base font-semibold text-[#C8A96A]"
                  >
                    ✓
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] sm:text-base">
                      {strength.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-6 text-zinc-600 sm:text-sm">
                      {strength.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button href={attorney.cta.href} className="mt-5 h-12 px-6 max-sm:w-full sm:h-14 sm:px-7">
              <span>{attorney.cta.label}</span>
              <span aria-hidden="true" className="ml-2 text-[#C8A96A]">
                →
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
