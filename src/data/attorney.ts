export type AttorneyCredential = {
  id: string;
  label: string;
  iconSrc: string;
  year?: string;
  note?: string;
  description?: string;
};

export type AttorneyTimelineItem = {
  label: string;
  period?: string;
  current?: boolean;
  highlight?: boolean;
};

export type AttorneyPrinciple = {
  title: string;
  description: string;
};

export type AttorneyProfile = {
  name: string;
  role: string;
  heroStatement: string;
  heroDescription: string;
  imageSrc: string;
  imageAlt: string;
  specialties: string[];
  credentials: AttorneyCredential[];
  greetingTitle: string;
  greetingParagraphs: string[];
  education: AttorneyTimelineItem[];
  qualifications: AttorneyTimelineItem[];
  careers: AttorneyTimelineItem[];
  representativeCaseSlugs: string[];
  principles: AttorneyPrinciple[];
  seoDescription: string;
};

export const attorneyProfile: AttorneyProfile = {
  name: "김찬협 변호사",
  role: "대표 변호사",
  heroStatement: "사건은 숫자가 아니라\n한 사람의 삶입니다.",
  heroDescription:
    "법적 분쟁은 초기 대응이 결과를 크게 좌우합니다. 사실관계를 면밀히 분석하고, 의뢰인이 이해할 수 있는 언어로 절차와 대응 방향을 설명드립니다.",
  imageSrc: "/images/attorney-kim-chan-hyeop-transparent2.png",
  imageAlt: "법률사무소 정천 김찬협 변호사",
  specialties: ["형사", "민사", "이혼·가사"],
  credentials: [
    {
      id: "attorney",
      label: "변호사",
      iconSrc: "/icons/credential-attorney.svg",
      year: "2016",
    },
    {
      id: "tax-accountant",
      label: "세무사",
      iconSrc: "/icons/credential-tax.svg",
      year: "2020",
    },
    {
      id: "patent-attorney",
      label: "변리사",
      iconSrc: "/icons/credential-patent.svg",
      year: "2024",
    },
    {
      id: "rehabilitation-counselor",
      label: "회생상담사",
      iconSrc: "/icons/credential-recovery.svg",
      year: "2025",
    },
    {
      id: "criminal-specialist",
      label: "형사전문",
      iconSrc: "/icons/credential-criminal.svg",
      note: "대한변협 등록",
    },
    {
      id: "civil-specialist",
      label: "민사전문",
      iconSrc: "/icons/credential-civil.svg",
      note: "대한변협 등록",
    },
  ],
  greetingTitle: "인사말",
  greetingParagraphs: [
    "법률 문제는 서류와 절차의 문제가 아니라 한 사람의 생활과 앞으로의 선택에 영향을 주는 일입니다.",
    "정천은 사실관계를 차분하게 확인하고, 의뢰인이 이해할 수 있는 언어로 가능한 대응 방향을 설명합니다.",
    "사건의 시작부터 마무리까지 책임 있게 살피며, 가장 현실적인 해결 방향을 찾기 위해 함께 고민하겠습니다.",
  ],
  education: [
    {
      label: "서울 중동고등학교 졸업",
    },
    {
      label: "고려대학교 법학과 졸업",
    },
    {
      label: "경북대학교 법학전문대학원 졸업",
    },
    {
      label: "고려대학교 법무대학원 졸업",
      period: "의료법학과, 수석",
    },
  ],
  qualifications: [
    {
      label: "변호사(2016) / 세무사(2020) / 변리사(2024) / 회생상담사(2025) 취득",
      highlight: false,
    },
    {
      label: "대한변호사협회 등록 형사 전문 변호사",
    },
    {
      label: "대한변호사협회 등록 민사 전문 변호사",
    },
  ],
  careers: [
    {
      label: "현) 법률사무소 정천 대표 변호사",
      current: true,
    },
    {
      label: "현) 대한변호사협회 등록 형사 전문 변호사",
      current: true,
    },
    {
      label: "현) 대한변호사협회 등록 민사 전문 변호사",
      current: true,
    },
    {
      label: "전) 법무법인 창경 변호사 (별산개업)",
    },
    {
      label: "전) 법무법인 태림 파트너변호사",
    },
    {
      label: "전) 법무법인 백현 파트너변호사",
    },
    {
      label: "전) 대한법률구조공단 공익법무관(송무)",
    },
  ],
  representativeCaseSlugs: ["example-slug-1", "example-slug-2", "example-slug-3"],
  principles: [
    {
      title: "정확한 초기 판단",
      description:
        "초기 상담 단계에서 사건의 쟁점과 필요한 자료를 빠르게 정리합니다.",
    },
    {
      title: "구조와 맥락 중심 분석",
      description:
        "개별 사실만이 아니라 사건이 발생한 전체 흐름과 법적 의미를 함께 봅니다.",
    },
    {
      title: "기록과 증거 기반 대응",
      description:
        "주장보다 자료가 설득력을 갖도록 기록과 증거를 체계적으로 정리합니다.",
    },
    {
      title: "끝까지 책임지는 수행",
      description:
        "상담부터 종결까지 의뢰인이 과정을 이해할 수 있도록 함께합니다.",
    },
  ],
  seoDescription:
    "법률사무소 정천 김찬협 변호사는 의뢰인의 상황을 정확히 이해하고 사건의 사실관계와 법적 쟁점을 바탕으로 대응 방향을 제시합니다.",
};
