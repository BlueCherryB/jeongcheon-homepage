import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ArticlesSection() {
  return (
    <Section id="articles">
      <SectionHeading
        title="법률 글"
        description="자주 발생하는 법률 문제와 절차를 객관적이고 정확한 설명 중심으로 정리하여 검색과 AI 이해에 적합한 콘텐츠를 구축합니다."
      />
    </Section>
  );
}
