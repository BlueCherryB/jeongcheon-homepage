import { Container } from "@/components/ui/Container";
import type { AttorneyIntroduction } from "@/data/attorney";

type AttorneyIntroductionSectionProps = {
  introduction: AttorneyIntroduction;
};

export function AttorneyIntroductionSection({
  introduction,
}: AttorneyIntroductionSectionProps) {
  return (
    <section className="bg-[#FAF8F4]">
      <Container className="py-18 sm:py-24 lg:py-28">
        <article className="mx-auto max-w-[800px]">
          <header>
            <div className="inline-flex flex-col items-start">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#C8A96A]">
                {introduction.eyebrow}
              </p>
              <span aria-hidden="true" className="mt-2 h-px w-20 bg-[#C8A96A]" />
            </div>
            <h2 className="font-chosun mt-6 break-keep text-[30px] font-normal leading-[1.45] tracking-[-0.02em] text-[#111B36] sm:mt-7 sm:text-[42px] sm:leading-[1.4]">
              {introduction.title}
            </h2>
          </header>

          <div className="mt-10 space-y-6 break-keep text-[16px] leading-8 text-[#111B36]/78 sm:mt-12 sm:text-[17px] sm:leading-9">
            {introduction.openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
            {introduction.sections.map((section) => (
              <section key={section.title}>
                <div className="h-px w-12 bg-[#C8A96A]" />
                <h3 className="font-chosun mt-5 break-keep text-[25px] font-normal leading-[1.45] tracking-[-0.02em] text-[#111B36] sm:text-[30px]">
                  {section.title}
                </h3>
                <div className="mt-6 space-y-6 break-keep text-[16px] leading-8 text-[#111B36]/78 sm:text-[17px] sm:leading-9">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}
