import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function PracticeSection() {
  const { practice } = homepageContent;

  return (
    <Section id={practice.id}>
      <SectionHeading
        title={practice.title}
        description={practice.description}
      />
    </Section>
  );
}
