import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function ContactSection() {
  const { contact } = homepageContent;

  return (
    <Section id={contact.id}>
      <SectionHeading
        title={contact.title}
        description={contact.description}
      />
    </Section>
  );
}
