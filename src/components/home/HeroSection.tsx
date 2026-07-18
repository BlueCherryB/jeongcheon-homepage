import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function HeroSection() {
  const { hero } = homepageContent;

  return (
    <Section bordered={false} spacing="hero">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="inline-flex flex-col items-start">
            <p className="text-[18px] font-semibold tracking-wide text-[#C8980A] sm:text-[20px] lg:text-[25px]">
              {hero.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="mt-0.5 h-px w-56 bg-[#C8980A] sm:w-64"
            />
          </div>
          <SectionHeading
            level={1}
            title={hero.title}
            description={hero.description}
            titleClassName="font-chosun mt-7 max-w-2xl whitespace-pre-line text-[40px] font-normal leading-[1.4] tracking-[-0.02em] text-[#0F172A] sm:text-[52px]"
            descriptionClassName="mt-5 max-w-md whitespace-pre-line text-base leading-[1.7] text-zinc-600"
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} className="h-14 px-7 text-[17px]">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              className="h-14 px-7 text-[17px]"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-zinc-100 sm:min-h-[480px] lg:min-h-[560px]">
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
