import Image from "next/image";

import { SearchForm } from "@/components/search/SearchForm";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function HeroSection() {
  const { hero } = homepageContent;

  return (
    <Section bordered={false} spacing="hero">
      <div className="relative isolate overflow-hidden sm:overflow-visible">
        <div className="grid items-center gap-0 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-16 lg:gap-y-0">
          <div className="relative z-10 order-1 max-w-2xl text-left sm:text-left">
            <div className="flex w-full flex-col items-start sm:inline-flex sm:w-auto sm:items-start">
              <p className="text-[17px] font-semibold tracking-wide text-[#C8980A] sm:text-[20px] lg:text-[25px]">
                {hero.eyebrow}
              </p>
              <span
                aria-hidden="true"
                className="mt-0.5 h-px w-49 bg-[#C8980A] sm:w-64"
              />
            </div>
            <SectionHeading
              level={1}
              title={hero.title}
              description={hero.description}
              titleClassName="font-chosun mt-6 max-w-2xl whitespace-pre-line text-[32px] font-normal leading-[1.35] tracking-[-0.02em] text-[#0F172A] sm:mt-7 sm:text-[52px] sm:leading-[1.4]"
              descriptionClassName="mx-auto mt-5 max-w-md whitespace-pre-line text-base leading-[1.7] text-zinc-600 sm:mx-0"
            />
          </div>

          <div className="relative z-10 order-3 hidden min-h-[360px] overflow-hidden bg-zinc-100 sm:block sm:min-h-[480px] lg:order-2 lg:h-[500px] lg:min-h-0">
            {/* Preserve the original desktop image crop, then clip its vertical edges. */}
            <div className="absolute inset-0 lg:inset-x-0 lg:-top-[30px] lg:bottom-auto lg:h-[560px]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover object-[center_45%]"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white to-transparent lg:block"
            />
          </div>

          <div className="order-2 mt-8 max-w-3xl sm:mt-9 lg:order-3 lg:col-span-2 lg:mx-auto lg:mt-12 lg:w-[85%] lg:max-w-6xl">
            <SearchForm variant="hero" />
          </div>
        </div>
      </div>
    </Section>
  );
}
