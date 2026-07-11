type HomeSectionContent = {
  id: string;
  title: string;
  description: string;
};

type AttorneyStrength = {
  title: string;
  description: string;
};

type AttorneyContent = {
  id: string;
  eyebrow: string;
  name: string;
  quote: string;
  description: string;
  strengths: AttorneyStrength[];
  image: {
    src: string;
    alt: string;
  };
  cta: {
    label: string;
    href: string;
  };
};

export const homepageContent = {
  hero: {
    eyebrow: "대한변협 형사전문",
    title: "의뢰인의 상황을\n정확하게 이해합니다.",
    description:
      "차분한 상담과 전략적인 대응으로\n가장 적합한 해결 방향을 제시합니다.",
    primaryCta: {
      label: "상담 예약",
      href: "#contact",
    },
    secondaryCta: {
      label: "전화 상담",
      href: "tel:",
    },
    image: {
      src: "/hero-law-office.png",
      alt: "정천 법률사무소를 상징하는 현대적인 법률 업무 공간 이미지",
    },
  },
  attorney: {
    id: "attorney",
    eyebrow: "대표 변호사",
    name: "김찬협 변호사",
    quote: "사건은 숫자가 아니라\n한 사람의 삶입니다.",
    description:
      "형사사건은 초기 대응이 결과를 크게 좌우합니다.\n사실관계를 면밀히 분석하고, 의뢰인이 이해할 수 있는 언어로\n절차와 대응 방향을 설명드립니다.",
    strengths: [
      {
        title: "상담부터 종결까지 직접 수행",
        description:
          "사건의 시작부터 마무리까지 변호사가 직접 책임지고 진행합니다.",
      },
      {
        title: "의뢰인과의 충분한 소통",
        description:
          "대응 방향을 이해할 수 있도록 충분히 설명하고 함께 고민합니다.",
      },
    ],
    image: {
      src: "/images/attorney-kim-chan-hyeop.jpg",
      alt: "김찬협 변호사 프로필 사진",
    },
    cta: {
      label: "변호사 소개 보기",
      href: "/attorney",
    },
  },
  practice: {
    id: "practice",
    title: "업무 분야",
    description:
      "형사 사건, 민사 분쟁, 기업 자문, 계약 검토 등 주요 법률 영역별 안내를 체계적으로 제공할 예정입니다.",
  },
  cases: {
    id: "cases",
    title: "사례",
    description:
      "실제 사건의 쟁점과 해결 과정을 개인정보와 비밀유지 원칙을 지켜 이해하기 쉬운 방식으로 정리할 예정입니다.",
  },
  articles: {
    id: "articles",
    title: "법률 글",
    description:
      "자주 발생하는 법률 문제와 절차를 객관적이고 정확한 설명 중심으로 정리하여 검색과 AI 이해에 적합한 콘텐츠를 구축합니다.",
  },
  faq: {
    id: "faq",
    title: "자주 묻는 질문",
    description:
      "상담 전 준비사항, 사건 진행 절차, 비용 안내 등 의뢰인이 자주 궁금해하는 내용을 명확하게 정리할 예정입니다.",
  },
  contact: {
    id: "contact",
    title: "상담 안내",
    description:
      "방문 상담, 전화 상담, 온라인 문의 등 상담 경로와 준비해야 할 자료를 안내하는 영역입니다.",
  },
} satisfies {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    image: {
      src: string;
      alt: string;
    };
  };
  attorney: AttorneyContent;
  practice: HomeSectionContent;
  cases: HomeSectionContent;
  articles: HomeSectionContent;
  faq: HomeSectionContent;
  contact: HomeSectionContent;
};
