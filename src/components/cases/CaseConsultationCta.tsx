import { Button } from "@/components/ui/Button";

export function CaseConsultationCta() {
  return (
    <section className="mt-16 rounded-[22px] border border-[#E8E2D7] bg-[#FAF8F4] px-8 py-9 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
      <div>
        <p className="text-sm font-semibold text-[#C8A96A]">상담 안내</p>
        <h2 className="font-chosun mt-3 text-[30px] font-normal leading-tight tracking-[-0.02em] text-[#111B36] sm:text-[36px]">
          유사한 법적 문제가 있으신가요?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#111B36]/75">
          정천의 변호사들이 의뢰인의 상황에 맞는 최적의 해결책을
          제시해드립니다.
        </p>
      </div>

      <Button href="/#contact" className="mt-7 h-14 px-7 lg:mt-0">
        상담 문의하기
      </Button>
    </section>
  );
}
