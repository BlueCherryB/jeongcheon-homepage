import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function HeroSection() {
  const { hero } = homepageContent;

  return (
    <Section bordered={false} spacing="hero">
      <p className="text-sm font-medium text-zinc-600">
        {hero.eyebrow}
      </p>
      <SectionHeading
        level={1}
        title={hero.title}
        description={hero.description}
        titleClassName="mt-4 max-w-3xl text-4xl font-semibold tracking-tight"
        descriptionClassName="mt-6 max-w-2xl text-lg leading-8 text-zinc-700"
      />
    </Section>
  );
}
