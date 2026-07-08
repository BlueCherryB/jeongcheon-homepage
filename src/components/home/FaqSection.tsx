import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function FaqSection() {
  const { faq } = homepageContent;

  return (
    <Section id={faq.id}>
      <SectionHeading
        title={faq.title}
        description={faq.description}
      />
    </Section>
  );
}
