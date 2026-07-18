import { PracticeAreaCard } from "@/components/practice/PracticeAreaCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";
import { practiceAreas } from "@/data/practice";

export function PracticeSection() {
  const { practice } = homepageContent;

  return (
    <section id={practice.id} className="bg-[#FAF8F4]">
      <Container className="py-24 lg:py-32">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
              {practice.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="mt-2.5 h-px w-28 bg-[#C8A96A]"
            />
          </div>

          <SectionHeading
            title={practice.message}
            titleClassName="font-chosun mx-auto mt-12 max-w-4xl whitespace-pre-line text-[28px] font-normal leading-[1.55] tracking-[-0.02em] text-[#111B36] sm:text-[32px] lg:text-[34px]"
          />
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <PracticeAreaCard key={area.slug} area={area} />
          ))}
        </div>
      </Container>
    </section>
  );
}
