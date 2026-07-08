import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function CasesSection() {
  const { cases } = homepageContent;

  return (
    <Section id={cases.id}>
      <SectionHeading
        title={cases.title}
        description={cases.description}
      />
    </Section>
  );
}
