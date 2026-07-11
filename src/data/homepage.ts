type HomeSectionContent = {
  id: string;
  title: string;
  description: string;
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
    title: "변호사 소개",
    description:
      "사건의 사실관계와 법적 쟁점을 면밀히 검토하고, 의뢰인이 이해할 수 있는 언어로 절차와 선택지를 설명합니다.",
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
  attorney: HomeSectionContent;
  practice: HomeSectionContent;
  cases: HomeSectionContent;
  articles: HomeSectionContent;
  faq: HomeSectionContent;
  contact: HomeSectionContent;
};
