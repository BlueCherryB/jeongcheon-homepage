import { caseCategoryFilters } from "@/data/cases";
import type { CaseStudy } from "@/data/cases";
import { getLatestCaseStudies } from "@/lib/cases";

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

type PracticeArea = {
  title: string;
  icon: "scale" | "document" | "family";
  href: string;
  items: string[];
};

type PracticeContent = {
  id: string;
  eyebrow: string;
  message: string;
  areas: PracticeArea[];
};

type CasesContent = {
  id: string;
  eyebrow: string;
  heading: string;
  filters: string[];
  viewAllLabel: string;
  viewAllHref: string;
  studies: CaseStudy[];
};

export const homepageContent = {
  hero: {
    eyebrow: "대한변협 형사전문",
    title: "의뢰인의 상황을\n정확하게 이해합니다.",
    description:
      "차분한 상담과 전략적인 대응으로\n가장 적합한 해결 방향을 제시합니다.",
    primaryCta: {
      label: "상담 예약",
      href: "#consultation",
    },
    secondaryCta: {
      label: "전화 상담",
      href: "#consultation",
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
    eyebrow: "업무 분야",
    message:
      "의뢰인의 권리를 지키고,\n최선의 결과를 위해 끝까지 함께하겠습니다.",
    areas: [
      {
        title: "형사",
        icon: "scale",
        href: "#consultation",
        items: [
          "경찰조사 및 수사 대응",
          "고소 · 고발 대리",
          "성범죄 사건",
          "영장 · 구속 사건",
        ],
      },
      {
        title: "민사",
        icon: "document",
        href: "#consultation",
        items: [
          "계약 분쟁",
          "손해배상 청구",
          "대여금 · 채권 회수",
          "부동산 분쟁",
        ],
      },
      {
        title: "이혼·가사",
        icon: "family",
        href: "#consultation",
        items: ["이혼 소송", "재산분할", "양육권 · 양육비", "상속 · 유류분"],
      },
    ],
  },
  cases: {
    id: "cases",
    eyebrow: "수행 사례",
    heading: "정천의 수행사례를 소개합니다.",
    filters: caseCategoryFilters.map((filter) => filter.label),
    viewAllLabel: "전체 사례 보기",
    viewAllHref: "/cases",
    studies: getLatestCaseStudies(5),
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
  practice: PracticeContent;
  cases: CasesContent;
  articles: HomeSectionContent;
  faq: HomeSectionContent;
};
