import type { CaseStudyCategory } from "@/types/content/caseStudy";

export type PracticeAreaSlug = "criminal" | "civil" | "family";

export type PracticeAreaIcon = "scale" | "document" | "family";

export type PracticeService = {
  title: string;
  description: string;
};

export type PracticeProcessStep = {
  title: string;
  description: string;
};

export type PracticeTrustItem = {
  title: string;
  description: string;
};

export type PracticeArea = {
  slug: PracticeAreaSlug;
  category: CaseStudyCategory;
  title: string;
  eyebrow: string;
  href: string;
  icon: PracticeAreaIcon;
  summary: string;
  metadataDescription: string;
  introductionTitle: string;
  introduction: string[];
  services: PracticeService[];
  process: PracticeProcessStep[];
  trustItems: PracticeTrustItem[];
  ctaTitle: string;
  ctaDescription: string;
};

export const criminalCertificateAssetPath =
  "/images/kba-criminal-specialist-certificate.png";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal",
    category: "criminal",
    title: "형사",
    eyebrow: "Criminal Defense",
    href: "/practice/criminal",
    icon: "scale",
    summary:
      "수사 초기부터 재판 단계까지 사실관계와 증거를 기준으로 대응 방향을 정리합니다.",
    metadataDescription:
      "법률사무소 정천의 형사 업무 분야 안내입니다. 경찰조사, 고소·고발, 성범죄, 영장·구속 사건의 기본 대응 방향을 확인할 수 있습니다.",
    introductionTitle: "초기 대응의 구조를 먼저 정리합니다",
    introduction: [
      "형사사건은 조사 전후의 진술, 증거 제출 시점, 피해자 또는 수사기관과의 대응 방식에 따라 진행 방향이 달라질 수 있습니다.",
      "정천은 기록과 사실관계를 먼저 확인하고, 의뢰인이 절차의 의미를 이해한 상태에서 다음 결정을 할 수 있도록 설명합니다.",
    ],
    services: [
      {
        title: "경찰조사 및 수사 대응",
        description:
          "조사 전 쟁점과 예상 질문을 정리하고, 진술 방향과 자료 제출 방식을 검토합니다.",
      },
      {
        title: "고소 · 고발 대리",
        description:
          "피해 사실과 증거를 법률 요건에 맞게 정리하여 고소장과 의견 제출을 준비합니다.",
      },
      {
        title: "성범죄 사건",
        description:
          "진술의 일관성, 객관 자료, 사건 당시 맥락을 종합해 방어와 대응 방향을 검토합니다.",
      },
      {
        title: "영장 · 구속 사건",
        description:
          "긴급한 절차에서 주거, 직업, 증거관계 등 구속 필요성 판단 요소를 빠르게 정리합니다.",
      },
    ],
    process: [
      {
        title: "초기 상담",
        description: "현재 절차와 조사 일정을 확인하고 우선 대응이 필요한 부분을 구분합니다.",
      },
      {
        title: "자료 검토",
        description: "진술, 메시지, 녹취, 계약서 등 사건 자료의 의미를 정리합니다.",
      },
      {
        title: "대응 전략 수립",
        description: "수사기관 제출 자료와 진술 방향을 사건 단계에 맞게 준비합니다.",
      },
      {
        title: "절차별 수행",
        description: "조사, 의견서, 합의, 재판 단계에서 필요한 대응을 이어갑니다.",
      },
    ],
    trustItems: [
      {
        title: "대한변호사협회 등록 형사 전문 변호사",
        description:
          "김찬협 변호사는 대한변호사협회에 형사 전문 분야로 등록되어 있습니다.",
      },
      {
        title: "직접 상담과 사건 검토",
        description:
          "초기 상담부터 주요 서면 검토까지 변호사가 사건의 흐름을 직접 확인합니다.",
      },
      {
        title: "증거와 기록 중심 대응",
        description:
          "주장만 앞세우기보다 기록으로 확인되는 사실관계를 기준으로 대응합니다.",
      },
    ],
    ctaTitle: "형사 절차의 첫 대응부터 함께 정리하겠습니다.",
    ctaDescription:
      "조사 일정이나 수사기관 연락을 받은 경우, 현재 단계와 필요한 자료부터 확인합니다.",
  },
  {
    slug: "civil",
    category: "civil",
    title: "민사",
    eyebrow: "Civil Litigation",
    href: "/practice/civil",
    icon: "document",
    summary:
      "계약, 손해배상, 채권 등 민사 분쟁의 쟁점을 차분하게 정리하고 해결 방향을 제시합니다.",
    metadataDescription:
      "법률사무소 정천의 민사 업무 분야 안내입니다. 계약 분쟁, 손해배상, 대여금·채권 회수, 부동산 분쟁의 기본 대응 방향을 확인할 수 있습니다.",
    introductionTitle: "분쟁의 구조와 증거관계를 함께 봅니다",
    introduction: [
      "민사 분쟁은 권리관계, 계약 내용, 손해 발생 경위, 입증 가능성을 함께 검토해야 합니다.",
      "정천은 청구의 근거와 상대방의 예상 반박을 나누어 살피고, 협의와 소송 중 현실적인 경로를 설명합니다.",
    ],
    services: [
      {
        title: "계약 분쟁",
        description:
          "계약서 문구, 이행 경과, 해제·해지 사유를 검토해 청구 가능성을 정리합니다.",
      },
      {
        title: "손해배상 청구",
        description:
          "위법 행위, 손해 발생, 인과관계, 손해액 산정 자료를 단계별로 확인합니다.",
      },
      {
        title: "대여금 · 채권 회수",
        description:
          "차용증, 계좌 내역, 변제 약정 등 회수 가능성을 판단할 자료를 검토합니다.",
      },
      {
        title: "부동산 분쟁",
        description:
          "매매, 임대차, 점유, 보증금 문제의 법률관계와 해결 절차를 정리합니다.",
      },
    ],
    process: [
      {
        title: "분쟁 구조 파악",
        description: "청구권의 근거와 상대방의 입장을 구분해 핵심 쟁점을 정리합니다.",
      },
      {
        title: "증거 정리",
        description: "계약서, 송금 내역, 문자, 내용증명 등 입증 자료를 확인합니다.",
      },
      {
        title: "청구 방향 검토",
        description: "협의, 내용증명, 지급명령, 소송 등 가능한 절차를 비교합니다.",
      },
      {
        title: "합의 · 소송 대응",
        description: "분쟁 규모와 자료 상태에 맞춰 협상 또는 소송을 진행합니다.",
      },
    ],
    trustItems: [
      {
        title: "대한변호사협회 등록 민사 전문 변호사",
        description:
          "김찬협 변호사는 대한변호사협회에 민사 전문 분야로 등록되어 있습니다.",
      },
      {
        title: "문서와 거래 흐름 분석",
        description:
          "계약 문구뿐 아니라 실제 이행 경과와 자료의 연결성을 함께 검토합니다.",
      },
      {
        title: "현실적인 절차 선택",
        description:
          "비용, 시간, 입증 가능성을 고려해 적절한 해결 방식을 설명합니다.",
      },
    ],
    ctaTitle: "민사 분쟁의 쟁점과 가능한 절차를 확인하겠습니다.",
    ctaDescription:
      "계약서, 송금 내역, 대화 자료 등 현재 가진 자료를 바탕으로 방향을 검토합니다.",
  },
  {
    slug: "family",
    category: "family",
    title: "이혼·가사",
    eyebrow: "Family Law",
    href: "/practice/family",
    icon: "family",
    summary:
      "가족관계 사건에서 필요한 절차와 선택지를 이해하기 쉽게 정리합니다.",
    metadataDescription:
      "법률사무소 정천의 이혼·가사 업무 분야 안내입니다. 이혼, 재산분할, 양육권·양육비, 상속·유류분 문제의 기본 대응 방향을 확인할 수 있습니다.",
    introductionTitle: "생활의 변화까지 고려해 절차를 설명합니다",
    introduction: [
      "이혼·가사 사건은 법률 문제와 생활의 변화가 함께 발생하기 때문에 감정과 절차를 분리해 차분히 정리하는 과정이 필요합니다.",
      "정천은 재산, 자녀, 생활 기반과 관련된 쟁점을 구분하고, 의뢰인이 선택지를 이해할 수 있도록 안내합니다.",
    ],
    services: [
      {
        title: "이혼 소송",
        description:
          "혼인 파탄 사유, 증거, 조정 가능성, 소송 절차를 사건 상황에 맞게 검토합니다.",
      },
      {
        title: "재산분할",
        description:
          "혼인 중 형성된 재산, 기여도, 채무 관계를 자료 중심으로 정리합니다.",
      },
      {
        title: "양육권 · 양육비",
        description:
          "자녀의 생활 환경, 양육 상황, 면접교섭과 비용 문제를 함께 검토합니다.",
      },
      {
        title: "상속 · 유류분",
        description:
          "상속재산 범위, 생전 증여, 기여분, 유류분 반환 가능성을 확인합니다.",
      },
    ],
    process: [
      {
        title: "상황 확인",
        description: "가족관계, 재산, 자녀, 현재 갈등 상황을 차분히 파악합니다.",
      },
      {
        title: "쟁점 구분",
        description: "이혼 사유, 재산, 양육, 상속 쟁점을 나누어 검토합니다.",
      },
      {
        title: "필요 자료 안내",
        description: "가족관계 서류, 재산 자료, 대화 자료 등 필요한 자료를 정리합니다.",
      },
      {
        title: "조정 · 소송 대응",
        description: "협의 가능성과 소송 필요성을 비교해 절차를 진행합니다.",
      },
    ],
    trustItems: [
      {
        title: "절차와 생활 문제의 분리",
        description:
          "감정적으로 복잡한 사안에서도 법률 쟁점과 생활 쟁점을 나누어 검토합니다.",
      },
      {
        title: "자료 기반 재산 검토",
        description:
          "재산분할과 상속 문제는 확인 가능한 자료를 기준으로 범위를 정리합니다.",
      },
      {
        title: "자녀 관련 쟁점 고려",
        description:
          "양육권, 양육비, 면접교섭은 자녀의 안정적인 생활을 함께 고려합니다.",
      },
    ],
    ctaTitle: "가사 사건의 절차와 선택지를 차분히 정리하겠습니다.",
    ctaDescription:
      "현재 상황과 필요한 자료를 확인하고, 다음 단계에서 고려할 쟁점을 안내합니다.",
  },
];

export function getPracticeAreaBySlug(
  slug: string,
): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
