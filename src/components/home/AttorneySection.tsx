import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function AttorneySection() {
  const { attorney } = homepageContent;

  return (
    <Section id={attorney.id}>
      <SectionHeading
        title={attorney.title}
        description={attorney.description}
      />
    </Section>
  );
}
