import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HeroSection() {
  return (
    <Section bordered={false} spacing="hero">
      <p className="text-sm font-medium text-zinc-600">
        Jeongcheon Law Office
      </p>
      <SectionHeading
        level={1}
        title="의뢰인의 상황을 정확히 이해하고 차분하게 해결 방향을 찾습니다."
        description="정천 법률사무소는 형사, 민사, 기업 법무 등 주요 법률 문제에 대해 신뢰할 수 있는 상담과 대응을 준비하는 법률 플랫폼입니다."
        titleClassName="mt-4 max-w-3xl text-4xl font-semibold tracking-tight"
        descriptionClassName="mt-6 max-w-2xl text-lg leading-8 text-zinc-700"
      />
    </Section>
  );
}
