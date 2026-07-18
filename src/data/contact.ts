export type OfficeContact = {
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  addressDetail: string;
  closedDays: string;
  urgentNotice: string;
  mapImage: {
    src: string;
    alt: string;
  };
  mapUrl: string;
};

export const officeContact: OfficeContact = {
  phoneDisplay: "010-2690-1699",
  phoneHref: "tel:01026901699",
  email: "kimch@jclaw.co.kr",
  emailHref: "mailto:kimch@jclaw.co.kr",
  address: "서울특별시 송파구 법원로8길 13, 517호 (문정동, 문정헤리움써밋타워)",
  addressDetail: "8호선 문정역 3번 출구",
  closedDays: "주말 및 공휴일 휴무",
  urgentNotice: "긴급 상담은 전화로 문의해 주십시오.",
  mapImage: {
    src: "/images/map-jeong-cheon.png",
    alt: "문정역, 서울동부지방법원, 서울동부지방검찰청과 문정역 테라타워의 위치를 보여주는 안내 지도",
  },
  mapUrl:
    "https://map.naver.com/p/entry/place/1232076095?c=15.00,0,0,0,dh&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607122131%26locale%3Dko%26svcName%3Dmap_pcv5",
};
