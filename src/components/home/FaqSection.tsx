import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeading
        title="자주 묻는 질문"
        description="상담 전 준비사항, 사건 진행 절차, 비용 안내 등 의뢰인이 자주 궁금해하는 내용을 명확하게 정리할 예정입니다."
      />
    </Section>
  );
}
