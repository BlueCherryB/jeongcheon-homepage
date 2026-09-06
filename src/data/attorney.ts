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

export type AttorneyIntroductionSection = {
  title: string;
  paragraphs: string[];
};

export type AttorneyIntroduction = {
  eyebrow: string;
  title: string;
  openingParagraphs: string[];
  sections: AttorneyIntroductionSection[];
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
  introduction: AttorneyIntroduction;
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
  imageSrc: "/images/attorney-kim-chan-hyeop-transparent4.png",
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
  introduction: {
    eyebrow: "변호사의 이야기",
    title: "정확한 법률적 판단, 치밀한 대응, 의뢰인의 권익을 위한 최선의 선택",
    openingParagraphs: [
      "법률분쟁은 단순히 법률 조항을 찾아 적용하는 것만으로 해결되지 않습니다. 복잡하게 얽힌 사실관계 속에서 사건의 핵심을 정확히 파악하고, 관련 법률과 판례를 면밀히 검토하며, 확보된 증거를 바탕으로 가장 효과적인 대응전략을 수립하는 것이 무엇보다 중요합니다.",
      "저는 2016년 변호사 자격을 취득한 이후 대한법률구조공단에서 3년간 공익법무관으로 근무하며 다양한 법률분쟁을 직접 경험하고 해결해 왔습니다. 이후 대형로펌 파트너변호사를 역임하고 현재까지 민사·형사·가사·행정 등 1,000건 이상의 소송 사건을 수행하면서 각 사건의 사실관계와 법적 쟁점을 분석하고, 의뢰인의 권익을 실질적으로 보호하기 위한 법률적 대응을 꾸준히 이어왔습니다.",
      "수많은 사건을 수행하면서 제가 가장 중요하게 생각해 온 것은 ‘사건의 본질을 정확하게 파악하는 것’입니다.",
      "동일한 유형의 법률분쟁이라 하더라도 사건을 둘러싼 구체적인 사실관계와 당사자의 이해관계, 증거의 내용에 따라 법률적 판단과 최적의 대응방법은 달라질 수 있습니다. 따라서 정형화된 방식으로 사건을 처리하기보다는 의뢰인의 이야기를 충분히 듣고, 사건의 사실관계를 면밀히 정리한 뒤, 법률적 쟁점과 위험요소를 정확하게 분석하는 데 중점을 두고 있습니다.",
    ],
    sections: [
      {
        title: "폭넓은 사건 경험을 바탕으로 한 실질적인 법률대응",
        paragraphs: [
          "그동안 민사·형사·가사·행정 등 다양한 분야에서 1,000건 이상의 사건을 수행하며 소송의 준비 단계부터 서면 작성, 증거 검토, 변론 및 재판 절차에 이르기까지 사건의 전 과정에 대한 실무 경험을 축적해 왔습니다.",
          "특히 소송에서는 단순히 법률상 주장을 나열하는 것만으로 충분하지 않습니다. 어떠한 사실을 주장할 것인지, 그 사실을 어떠한 증거로 입증할 것인지, 상대방의 주장에 어떻게 대응할 것인지를 종합적으로 검토하여 논리적인 소송전략을 수립해야 합니다.",
          "저는 축적된 실무 경험을 바탕으로 사건의 핵심 쟁점을 선별하고, 불필요한 법적 분쟁과 비용을 최소화하면서 의뢰인의 목적에 부합하는 현실적인 해결방안을 제시하고자 합니다.",
          "또한 현재 대한변호사협회가 인증한 민사·형사 전문 변호사로서, 민사·형사 분야의 전문성을 바탕으로 보다 깊이 있는 법률서비스를 제공하고 있습니다.",
        ],
      },
      {
        title: "분쟁의 해결을 넘어, 분쟁의 예방까지",
        paragraphs: [
          "저는 기업과 사업체를 대상으로 각종 계약서의 검토 및 작성과 법률자문 업무도 수행하고 있습니다.",
          "기업이나 사업을 운영하는 과정에서는 계약의 작은 문구 하나가 향후 상당한 법적 책임이나 경제적 손실로 이어질 수 있습니다. 계약 체결 당시에는 문제가 없어 보였던 조항이 실제 분쟁이 발생한 이후에는 중요한 쟁점으로 작용하는 경우도 적지 않습니다.",
          "이에 계약의 문언뿐만 아니라 거래의 목적과 구조, 당사자의 권리·의무, 책임의 범위 및 분쟁 발생 가능성 등을 종합적으로 검토하여 사업상 발생할 수 있는 법률적 위험을 사전에 줄이는 것을 중요한 법률서비스의 영역으로 생각하고 있습니다.",
          "분쟁이 발생한 이후의 신속하고 정확한 대응은 물론, 분쟁이 발생하기 전에 법률적 위험을 발견하고 예방하는 것 역시 변호사의 중요한 역할이라고 생각합니다.",
        ],
      },
      {
        title: "의뢰인의 입장에서 생각하고, 법률적으로 가장 치밀하게 대응하겠습니다",
        paragraphs: [
          "변호사에게 사건을 맡긴다는 것은 단순히 법률서비스를 구매하는 것이 아닙니다. 의뢰인에게는 재산과 사업, 가족관계, 명예와 신뢰 등 지켜야 할 중요한 가치가 걸려 있는 경우가 많습니다.",
          "그렇기에 저는 사건을 숫자나 서류만으로 바라보지 않습니다. 의뢰인에게 이 사건이 어떤 의미를 갖는지 이해하고, 그에 맞는 법률적 해결책을 찾는 것에서 변호사의 역할이 시작된다고 생각합니다.",
          "모든 사건에서 반드시 원하는 결과를 얻을 수 있다고 말씀드릴 수는 없습니다. 그러나 사건의 가능성과 한계를 정확하게 설명하고, 의뢰인이 충분히 이해하고 판단할 수 있도록 하며, 일단 맡겨진 사건에 대해서는 가능한 모든 법률적 수단을 면밀히 검토하여 최선의 결과를 이끌어내기 위해 노력하겠습니다.",
          "풍부한 사건 경험과 전문성, 그리고 치밀한 법률적 분석을 바탕으로 의뢰인의 권리와 이익을 지키는 신뢰할 수 있는 법률파트너가 되겠습니다.",
        ],
      },
    ],
  },
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
