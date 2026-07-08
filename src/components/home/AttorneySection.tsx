import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AttorneySection() {
  return (
    <Section id="attorney">
      <SectionHeading
        title="변호사 소개"
        description="사건의 사실관계와 법적 쟁점을 면밀히 검토하고, 의뢰인이 이해할 수 있는 언어로 절차와 선택지를 설명합니다."
      />
    </Section>
  );
}
