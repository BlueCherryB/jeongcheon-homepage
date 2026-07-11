import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";

export function AttorneySection() {
  const { attorney } = homepageContent;

  return (
    <section id={attorney.id} className="bg-[#FAFAF8]">
      <Container className="py-28 lg:py-32">
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

            <h2 className="font-chosun mt-6 text-[42px] font-normal leading-tight tracking-[-0.02em] text-[#0F172A] sm:text-[54px]">
              {attorney.name}
            </h2>

            <blockquote className="relative mt-10">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-6 font-chosun text-6xl leading-none text-[#C8A96A]"
              >
                “
              </span>
              <p className="font-chosun whitespace-pre-line text-[31px] font-normal leading-[1.42] tracking-[-0.02em] text-[#020617] sm:text-[30px]">
                {attorney.quote}
              </p>
            </blockquote>

            <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-[1.75] text-zinc-700 sm:text-lg">
              {attorney.description}
            </p>

            <div className="mt-8 border-y border-[#C8A96A]/25">
              {attorney.strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="flex gap-4 border-b border-[#C8A96A]/20 py-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-base font-semibold text-[#C8A96A]"
                  >
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">
                      {strength.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {strength.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button href={attorney.cta.href} className="mt-5 h-14 px-7 max-sm:w-full">
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
