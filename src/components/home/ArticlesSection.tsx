import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

export function ArticlesSection() {
  const { articles } = homepageContent;

  return (
    <Section id={articles.id}>
      <SectionHeading
        title={articles.title}
        description={articles.description}
      />
    </Section>
  );
}
