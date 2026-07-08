import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        title="상담 안내"
        description="방문 상담, 전화 상담, 온라인 문의 등 상담 경로와 준비해야 할 자료를 안내하는 영역입니다."
      />
    </Section>
  );
}
