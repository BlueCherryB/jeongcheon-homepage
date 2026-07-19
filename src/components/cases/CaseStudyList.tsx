import {
  CaseStudyCard,
  type CaseStudyCardItem,
} from "@/components/home/CaseStudyCard";

type CaseStudyListProps = {
  caseStudies: CaseStudyCardItem[];
};

export function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  return (
    <div>
      <div
        aria-hidden="true"
        className="mb-1 hidden grid-cols-[120px_minmax(0,1fr)_150px_168px] rounded-md border border-[#E8E2D7] bg-white/45 px-10 py-3 text-sm font-semibold text-[#111B36] lg:grid lg:gap-8"
      >
        <div className="text-center">분야</div>
        <div>사건명</div>
        <div className="text-center">결과</div>
        <div className="text-center">날짜</div>
      </div>

      {caseStudies.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.slug}
              caseStudy={caseStudy}
              variant="board"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[#E8E2D7] bg-white px-6 py-12 text-center text-[#111B36]/70 shadow-[0_16px_40px_rgba(17,27,54,0.04)] sm:px-8">
          조건에 맞는 수행사례가 없습니다.
        </div>
      )}
    </div>
  );
}
