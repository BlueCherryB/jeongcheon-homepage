export type PracticeAreaSlug = "criminal" | "civil" | "family";

export type PracticeAreaIcon = "scale" | "document" | "family";

export type PracticeArea = {
  slug: PracticeAreaSlug;
  title: string;
  eyebrow: string;
  href: string;
  icon: PracticeAreaIcon;
  summary: string;
  services: string[];
  process: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal",
    title: "형사",
    eyebrow: "Criminal Defense",
    href: "/practice/criminal",
    icon: "scale",
    summary:
      "수사 초기부터 재판 단계까지 사실관계와 증거를 기준으로 대응 방향을 정리합니다.",
    services: ["경찰조사 및 수사 대응", "고소 · 고발 대리", "성범죄 사건", "영장 · 구속 사건"],
    process: ["초기 상담", "자료 검토", "대응 전략 수립", "절차별 수행"],
  },
  {
    slug: "civil",
    title: "민사",
    eyebrow: "Civil Litigation",
    href: "/practice/civil",
    icon: "document",
    summary:
      "계약, 손해배상, 채권 등 민사 분쟁의 쟁점을 차분하게 정리하고 해결 방향을 제시합니다.",
    services: ["계약 분쟁", "손해배상 청구", "대여금 · 채권 회수", "부동산 분쟁"],
    process: ["분쟁 구조 파악", "증거 정리", "청구 방향 검토", "합의 · 소송 대응"],
  },
  {
    slug: "family",
    title: "이혼·가사",
    eyebrow: "Family Law",
    href: "/practice/family",
    icon: "family",
    summary:
      "가족관계 사건에서 필요한 절차와 선택지를 이해하기 쉽게 정리합니다.",
    services: ["이혼 소송", "재산분할", "양육권 · 양육비", "상속 · 유류분"],
    process: ["상황 확인", "쟁점 구분", "필요 자료 안내", "조정 · 소송 대응"],
  },
];

export function getPracticeAreaBySlug(
  slug: string,
): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
