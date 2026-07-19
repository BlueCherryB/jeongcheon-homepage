import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function HeroSection() {
  const { hero } = homepageContent;

  return (
    <Section bordered={false} spacing="hero">
      <div className="grid items-center gap-0 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="max-w-2xl text-left sm:text-left">
          <div className="flex w-full flex-col items-start sm:inline-flex sm:w-auto sm:items-start">
            <p className="text-xl font-semibold tracking-wide text-[#C8980A] sm:text-[20px] lg:text-[25px]">
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
            titleClassName="font-chosun mt-6 max-w-2xl whitespace-pre-line text-[34px] font-normal leading-[1.35] tracking-[-0.02em] text-[#0F172A] sm:mt-7 sm:text-[52px] sm:leading-[1.4]"
            descriptionClassName="mx-auto mt-5 max-w-md whitespace-pre-line text-base leading-[1.7] text-zinc-600 sm:mx-0"
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} className="h-12 px-6 text-[18px] sm:h-14 sm:px-7 sm:text-[17px]">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              className="h-12 px-6 text-[18px] sm:h-14 sm:px-7 sm:text-[17px]"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[360px] overflow-hidden bg-zinc-100 sm:block sm:min-h-[480px] lg:min-h-[560px]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover object-[center_45%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white to-transparent lg:block"
          />
        </div>
      </div>
    </Section>
  );
}
