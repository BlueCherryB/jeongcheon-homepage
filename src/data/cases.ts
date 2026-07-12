export type CaseCategoryId = "criminal" | "civil" | "family";

export type CaseStudy = {
  slug: string;
  categoryId: CaseCategoryId;
  categoryLabel: "형사" | "민사" | "이혼·가사";
  title: string;
  summary: string;
  publishedAt: string;
  displayDate: string;
  result: string;
  resultDetail: string;
  overview: string[];
  issues: string[];
  strategy: string[];
  outcome: string[];
  keywords: string[];
  relatedPracticeIds: string[];
  relatedCaseSlugs: string[];
  featured?: boolean;
};

export type CaseCategoryFilter = {
  label: string;
  value: "all" | CaseCategoryId;
};

export const caseCategoryFilters: CaseCategoryFilter[] = [
  { label: "전체", value: "all" },
  { label: "형사", value: "criminal" },
  { label: "민사", value: "civil" },
  { label: "이혼·가사", value: "family" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "example-slug-1",
    categoryId: "criminal",
    categoryLabel: "형사",
    title: "주식양수도계약서 위조 및 업무상횡령 사건",
    summary:
      "경영권 분쟁 과정에서 제기된 사문서위조 및 업무상횡령 혐의 사건에서, 면밀한 사실관계 검토와 법리적 주장을 통해 혐의없음 처분을 이끌어냈습니다.",
    publishedAt: "2026-07-15",
    displayDate: "2026.07.15",
    result: "무혐의",
    resultDetail: "혐의없음(불송치)",
    overview: [
      "경영권 분쟁 과정에서 주식양수도계약서 작성 경위와 회사 자금 사용 내역이 문제 된 사건입니다. 상대방은 계약서 위조와 업무상횡령 가능성을 주장하며 수사기관에 문제를 제기했습니다.",
      "의뢰인은 거래와 자금 집행이 회사 운영 과정에서 이루어진 정당한 절차였다는 입장이었고, 초기 조사 단계에서 사실관계를 체계적으로 정리하는 것이 중요했습니다.",
    ],
    issues: [
      "계약서 작성과 날인 과정에 위조의 고의가 있었는지",
      "회사 자금 사용이 개인적 이익을 위한 횡령으로 평가될 수 있는지",
      "경영권 분쟁에서 비롯된 주장과 형사책임 판단을 구분할 수 있는지",
    ],
    strategy: [
      "정천은 계약 체결 전후의 대화 기록, 이사회 및 내부 승인 자료, 자금 집행 내역을 시간순으로 정리했습니다. 또한 민사적 경영권 분쟁의 쟁점과 형사범죄 성립 요건을 분리해 수사기관이 오해할 수 있는 부분을 소명했습니다.",
      "조사 과정에서는 의뢰인의 진술이 일관되게 유지되도록 핵심 사실관계를 정리하고, 사문서위조와 업무상횡령의 구성요건별로 반박 자료를 제출했습니다.",
    ],
    outcome: [
      "수사기관은 제출된 자료와 법리 검토를 바탕으로 주요 혐의에 대해 혐의없음 취지의 불송치 처분을 했습니다.",
      "의뢰인은 형사절차의 부담을 줄이고, 남은 경영권 분쟁에 보다 차분하게 대응할 수 있는 기반을 마련했습니다.",
    ],
    keywords: ["형사", "업무상횡령", "사문서위조", "불송치"],
    relatedPracticeIds: ["criminal-defense", "corporate-disputes"],
    relatedCaseSlugs: ["example-slug-4", "business-obstruction-defense-2026"],
    featured: true,
  },
  {
    slug: "example-slug-2",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "건설공사대금 청구 사건",
    summary:
      "공사대금 미지급으로 인한 분쟁에서 계약서 및 공정 내역 분석을 바탕으로 의뢰인의 정당한 권리를 인정받아 승소 판결을 이끌어냈습니다.",
    publishedAt: "2026-06-28",
    displayDate: "2026.06.28",
    result: "승소",
    resultDetail: "일부승소",
    overview: [
      "공사 완료 이후 잔여 공사대금 지급이 지연되면서 발생한 민사 분쟁입니다. 상대방은 일부 공정의 미완성 및 하자를 이유로 대금 지급을 거부했습니다.",
      "의뢰인은 실제 공정 진행 내역과 현장 정산 자료를 바탕으로 미지급 대금의 지급을 구하고자 했습니다.",
    ],
    issues: [
      "계약상 공사 범위와 실제 완료된 공정의 범위",
      "상대방이 주장한 하자와 미지급 대금 사이의 관계",
      "정산 자료와 현장 기록의 증명력",
    ],
    strategy: [
      "계약서, 견적서, 공정표, 현장 사진과 정산 내역을 대조해 공사 이행 범위를 구체화했습니다. 상대방의 하자 주장에 대해서는 하자 항목과 대금 지급 거절 사유가 직접 연결되는지를 중심으로 반박했습니다.",
      "청구 금액은 인정 가능성이 높은 항목 중심으로 정리하여 법원이 판단하기 쉬운 구조로 제출했습니다.",
    ],
    outcome: [
      "법원은 의뢰인의 청구 중 상당 부분을 인정했고, 상대방에게 미지급 공사대금 지급 의무가 있다고 판단했습니다.",
      "의뢰인은 장기간 지연되던 공사대금 회수의 실질적인 근거를 확보했습니다.",
    ],
    keywords: ["민사", "공사대금", "계약분쟁", "손해배상"],
    relatedPracticeIds: ["construction", "civil-litigation"],
    relatedCaseSlugs: ["loan-repayment-claim-2026", "damage-compensation-settlement-2026"],
    featured: true,
  },
  {
    slug: "example-slug-3",
    categoryId: "family",
    categoryLabel: "이혼·가사",
    title: "이혼 및 재산분할 청구 사건",
    summary:
      "혼인기간 중 형성된 재산에 대한 기여도를 입증하여 의뢰인에게 유리한 재산분할 비율(80%)로 조정 성립하였습니다.",
    publishedAt: "2026-06-10",
    displayDate: "2026.06.10",
    result: "조정성립",
    resultDetail: "재산분할 80%",
    overview: [
      "혼인기간 중 형성된 재산의 귀속과 기여도를 둘러싸고 다툼이 있었던 이혼 및 재산분할 사건입니다. 상대방은 주요 재산 형성에 대한 의뢰인의 기여를 제한적으로 평가해야 한다고 주장했습니다.",
      "의뢰인은 경제활동, 가사노동, 자녀 양육 등 혼인 생활 전반에서 기여한 내용을 객관적으로 정리할 필요가 있었습니다.",
    ],
    issues: [
      "혼인기간 중 형성된 재산의 범위",
      "각 당사자의 재산 형성 및 유지에 대한 기여도",
      "조정 절차에서 실질적인 합의 가능성을 확보하는 방법",
    ],
    strategy: [
      "정천은 금융자료, 생활비 부담 내역, 자녀 양육 및 가사 기여 자료를 정리해 재산 형성과 유지 과정에서 의뢰인의 역할을 설명했습니다.",
      "감정적 대립이 커지지 않도록 핵심 쟁점을 재산분할 기준과 증빙 자료 중심으로 좁히고, 조정 절차에서 실현 가능한 합의안을 제시했습니다.",
    ],
    outcome: [
      "조정 절차에서 의뢰인에게 유리한 재산분할 비율을 반영한 합의가 성립했습니다.",
      "의뢰인은 장기화될 수 있는 소송 부담을 줄이면서 경제적 기반을 확보할 수 있었습니다.",
    ],
    keywords: ["이혼", "재산분할", "가사", "조정"],
    relatedPracticeIds: ["divorce", "property-division"],
    relatedCaseSlugs: ["divorce-alimony-claim-2026", "custody-parental-rights-2026"],
    featured: true,
  },
  {
    slug: "example-slug-4",
    categoryId: "criminal",
    categoryLabel: "형사",
    title: "특정경제범죄가중처벌등에관한법률위반(사기) 사건",
    summary:
      "복잡한 거래관계와 고의성 입증을 다투어 의뢰인의 혐의를 적극 소명하여 무혐의 처분을 받았습니다.",
    publishedAt: "2026-05-22",
    displayDate: "2026.05.22",
    result: "무혐의",
    resultDetail: "혐의없음(불송치)",
    overview: [
      "복수의 거래와 정산 과정이 얽힌 경제범죄 사건으로, 상대방은 의뢰인이 처음부터 변제 또는 이행 의사 없이 거래를 진행했다고 주장했습니다.",
      "거래관계가 장기간 이어진 만큼 자료의 양이 많았고, 단순한 채무불이행과 사기 혐의를 구분하는 것이 핵심이었습니다.",
    ],
    issues: [
      "거래 당시 기망행위와 편취 고의가 인정되는지",
      "민사상 채무불이행과 형사상 사기의 경계",
      "거래 자료와 정산 내역을 통해 의뢰인의 이행 의사를 설명할 수 있는지",
    ],
    strategy: [
      "거래별 계약 내용, 지급 내역, 정산 과정, 사후 협의 내용을 표로 정리해 수사기관이 전체 흐름을 파악할 수 있도록 했습니다.",
      "특정 시점의 미이행만으로 형사 고의를 단정하기 어렵다는 점을 법리와 자료를 통해 설명했습니다.",
    ],
    outcome: [
      "수사기관은 거래 경위와 제출 자료를 검토한 뒤 사기 혐의가 인정되기 어렵다고 판단했습니다.",
      "의뢰인은 형사절차상 부담을 덜고 민사적 정산 문제에 집중할 수 있게 되었습니다.",
    ],
    keywords: ["사기", "경제범죄", "형사방어", "불송치"],
    relatedPracticeIds: ["criminal-defense", "fraud"],
    relatedCaseSlugs: ["example-slug-1", "fraud-complaint-investment-2026"],
  },
  {
    slug: "example-slug-5",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "상가 임대차보증금 반환 청구 사건",
    summary:
      "임대인의 보증금 반환 거부에 대응하여 법적 절차를 통해 전액 반환 판결을 받아내어 의뢰인의 재산권을 보호하였습니다.",
    publishedAt: "2026-05-02",
    displayDate: "2026.05.02",
    result: "승소",
    resultDetail: "전액 반환",
    overview: [
      "상가 임대차 종료 후 임대인이 원상회복과 정산 문제를 이유로 보증금 반환을 거부한 사건입니다.",
      "의뢰인은 영업 종료 이후에도 보증금 반환이 지연되어 재산상 부담이 커진 상황이었습니다.",
    ],
    issues: [
      "임대차 종료와 목적물 인도 사실",
      "원상회복 비용 공제 주장의 타당성",
      "보증금 반환 지연에 따른 법적 책임",
    ],
    strategy: [
      "임대차계약서, 인도 자료, 원상회복 관련 사진 및 정산 내역을 검토해 반환 거부 사유를 항목별로 반박했습니다.",
      "청구 원인과 증빙을 간명하게 정리하여 보증금 반환 의무가 명확하다는 점을 강조했습니다.",
    ],
    outcome: [
      "법원은 임대인의 반환 의무를 인정했고, 의뢰인은 보증금 전액 반환 판결을 확보했습니다.",
      "불필요하게 장기화되던 임대차 분쟁을 법적 절차를 통해 정리할 수 있었습니다.",
    ],
    keywords: ["임대차", "보증금 반환", "민사소송", "상가"],
    relatedPracticeIds: ["real-estate", "civil-litigation"],
    relatedCaseSlugs: ["lease-deposit-return-2026", "real-estate-contract-cancel-2026"],
  },
  {
    slug: "fraud-complaint-investment-2026",
    categoryId: "criminal",
    categoryLabel: "형사",
    title: "사기 혐의 형사고소 사건",
    summary:
      "투자금 편취가 문제 된 사건에서 거래 경위와 입금 자료를 정리하여 피해 회복을 위한 고소 절차를 진행했습니다.",
    publishedAt: "2026-04-18",
    displayDate: "2026.04.18",
    result: "기소의견",
    resultDetail: "검찰 송치",
    overview: ["투자금 지급 이후 약정된 설명과 다른 정황이 드러나 형사고소를 검토한 사건입니다."],
    issues: ["투자 당시 설명 내용과 실제 진행 경과의 차이", "기망행위 및 편취 의사를 뒷받침할 자료"],
    strategy: ["입금 자료, 메시지 내역, 투자 설명 자료를 정리하여 고소장과 증거 의견을 구성했습니다."],
    outcome: ["수사기관은 주요 쟁점에 대한 추가 수사가 필요하다고 보고 사건을 검찰로 송치했습니다."],
    keywords: ["사기고소", "투자금", "형사"],
    relatedPracticeIds: ["fraud", "criminal-complaint"],
    relatedCaseSlugs: ["example-slug-4", "example-slug-1"],
  },
  {
    slug: "business-obstruction-defense-2026",
    categoryId: "criminal",
    categoryLabel: "형사",
    title: "업무방해 혐의 사건",
    summary:
      "영업장 내 분쟁 과정에서 제기된 업무방해 혐의에 대해 현장 자료와 진술의 모순점을 검토하여 방어 논리를 구성했습니다.",
    publishedAt: "2026-04-03",
    displayDate: "2026.04.03",
    result: "감경",
    resultDetail: "벌금 감액",
    overview: ["영업장 내 갈등 이후 업무방해 혐의가 제기되어 사실관계와 피해 범위가 다투어진 사건입니다."],
    issues: ["업무방해 행위의 구체성", "피해 발생 범위와 진술의 일관성"],
    strategy: ["현장 자료와 관계자 진술을 대조해 과장된 부분을 정리하고 양형 자료를 함께 제출했습니다."],
    outcome: ["사안의 경위와 자료가 반영되어 초기 예상보다 낮은 수준의 처분으로 마무리되었습니다."],
    keywords: ["업무방해", "형사방어", "양형"],
    relatedPracticeIds: ["criminal-defense"],
    relatedCaseSlugs: ["example-slug-1", "example-slug-4"],
  },
  {
    slug: "loan-repayment-claim-2026",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "대여금 반환 청구 사건",
    summary:
      "차용증이 명확하지 않은 금전거래에서 계좌 내역과 대화 기록을 정리하여 대여 사실을 입증했습니다.",
    publishedAt: "2026-03-21",
    displayDate: "2026.03.21",
    result: "승소",
    resultDetail: "청구 인용",
    overview: ["개인 간 금전거래 이후 변제가 이루어지지 않아 대여금 반환을 구한 사건입니다."],
    issues: ["금전 지급의 법적 성격", "변제 약정과 변제기 도래 여부"],
    strategy: ["계좌 이체 내역과 대화 기록을 시간순으로 정리해 대여 사실과 변제 약정을 설명했습니다."],
    outcome: ["법원은 의뢰인의 청구를 인정했고 대여금 반환 의무를 명확히 했습니다."],
    keywords: ["대여금", "민사", "채권회수"],
    relatedPracticeIds: ["civil-litigation", "debt-collection"],
    relatedCaseSlugs: ["example-slug-2", "damage-compensation-settlement-2026"],
  },
  {
    slug: "damage-compensation-settlement-2026",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "손해배상 청구 사건",
    summary:
      "계약 이행 지연으로 발생한 손해에 대해 손해 범위와 인과관계를 정리하여 합리적인 배상 범위를 인정받았습니다.",
    publishedAt: "2026-03-08",
    displayDate: "2026.03.08",
    result: "조정성립",
    resultDetail: "손해 일부 인정",
    overview: ["계약 이행 지연으로 손해가 발생했다는 주장에 따라 배상 범위가 문제 된 사건입니다."],
    issues: ["이행 지연과 손해 사이의 인과관계", "인정 가능한 손해액의 범위"],
    strategy: ["계약 이행 경과와 손해 자료를 분리해 정리하고, 과도한 청구 부분은 조정 과정에서 조율했습니다."],
    outcome: ["당사자 사이에 합리적인 배상 범위를 반영한 조정이 성립했습니다."],
    keywords: ["손해배상", "계약분쟁", "조정"],
    relatedPracticeIds: ["civil-litigation", "contract-disputes"],
    relatedCaseSlugs: ["example-slug-2", "loan-repayment-claim-2026"],
  },
  {
    slug: "real-estate-contract-cancel-2026",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "부동산 매매계약 해제 사건",
    summary:
      "계약금 반환과 계약 해제 여부가 다투어진 사건에서 계약 조항과 이행 경과를 검토해 분쟁을 조정했습니다.",
    publishedAt: "2026-02-19",
    displayDate: "2026.02.19",
    result: "조정성립",
    resultDetail: "계약금 일부 반환",
    overview: ["부동산 매매계약 이행 과정에서 해제 사유와 계약금 반환 범위를 둘러싸고 다툼이 발생했습니다."],
    issues: ["계약 해제 사유의 존재", "계약금 반환 또는 몰취 주장의 타당성"],
    strategy: ["계약서 조항, 특약, 이행 최고 경과를 검토하여 조정 가능한 쟁점을 정리했습니다."],
    outcome: ["계약금 일부 반환을 포함한 조정안으로 분쟁을 종결했습니다."],
    keywords: ["부동산", "계약해제", "민사"],
    relatedPracticeIds: ["real-estate", "contract-disputes"],
    relatedCaseSlugs: ["example-slug-5", "lease-deposit-return-2026"],
  },
  {
    slug: "lease-deposit-return-2026",
    categoryId: "civil",
    categoryLabel: "민사",
    title: "임대차보증금 반환 청구 사건",
    summary:
      "임대차 종료 후 보증금 반환이 지연된 사안에서 내용증명과 소송 절차를 통해 반환 책임을 명확히 했습니다.",
    publishedAt: "2026-02-04",
    displayDate: "2026.02.04",
    result: "승소",
    resultDetail: "보증금 반환",
    overview: ["임대차 종료에도 보증금 반환이 지연되어 법적 청구가 필요했던 사건입니다."],
    issues: ["임대차 종료와 목적물 인도 여부", "보증금 반환 지연 책임"],
    strategy: ["계약 종료 통지, 인도 자료, 정산 내역을 정리해 반환 의무를 명확히 주장했습니다."],
    outcome: ["보증금 반환 책임이 인정되어 의뢰인의 재산상 부담을 줄일 수 있었습니다."],
    keywords: ["임대차", "보증금", "부동산"],
    relatedPracticeIds: ["real-estate", "civil-litigation"],
    relatedCaseSlugs: ["example-slug-5", "real-estate-contract-cancel-2026"],
  },
  {
    slug: "custody-parental-rights-2026",
    categoryId: "family",
    categoryLabel: "이혼·가사",
    title: "양육권 및 친권자 지정 사건",
    summary:
      "자녀의 생활환경과 양육 경과를 중심으로 자료를 정리하여 안정적인 양육 환경이 반영되도록 주장했습니다.",
    publishedAt: "2026-01-20",
    displayDate: "2026.01.20",
    result: "인용",
    resultDetail: "친권자 지정",
    overview: ["이혼 절차에서 자녀의 양육 환경과 친권자 지정이 주요 쟁점이 된 사건입니다."],
    issues: ["자녀의 안정적인 생활환경", "주된 양육자의 양육 경과와 계획"],
    strategy: ["양육 일지, 교육 및 생활 자료를 정리해 자녀 복리에 부합하는 방안을 설명했습니다."],
    outcome: ["자녀의 생활 안정성을 고려한 친권자 및 양육 관련 판단을 받을 수 있었습니다."],
    keywords: ["양육권", "친권", "가사"],
    relatedPracticeIds: ["divorce", "custody"],
    relatedCaseSlugs: ["example-slug-3", "divorce-alimony-claim-2026"],
  },
  {
    slug: "divorce-alimony-claim-2026",
    categoryId: "family",
    categoryLabel: "이혼·가사",
    title: "이혼 및 위자료 청구 사건",
    summary:
      "혼인 파탄의 경위와 관련 증거를 정리하여 위자료와 재산분할 쟁점을 함께 조율했습니다.",
    publishedAt: "2026-01-06",
    displayDate: "2026.01.06",
    result: "조정성립",
    resultDetail: "위자료 인정",
    overview: ["혼인 파탄의 책임과 위자료, 재산분할이 함께 문제 된 이혼 사건입니다."],
    issues: ["혼인 파탄 경위", "위자료 인정 가능성과 재산분할 쟁점"],
    strategy: ["관련 자료를 감정적 주장과 분리해 정리하고 조정 절차에서 합의 가능한 범위를 제시했습니다."],
    outcome: ["위자료와 재산분할 내용을 포함한 조정이 성립되어 절차를 마무리했습니다."],
    keywords: ["이혼", "위자료", "재산분할"],
    relatedPracticeIds: ["divorce", "property-division"],
    relatedCaseSlugs: ["example-slug-3", "custody-parental-rights-2026"],
  },
  {
    slug: "inheritance-division-judgment-2025",
    categoryId: "family",
    categoryLabel: "이혼·가사",
    title: "상속재산분할 심판 사건",
    summary:
      "상속인 사이의 기여분과 특별수익 쟁점을 정리하여 상속재산 분할 기준을 명확히 했습니다.",
    publishedAt: "2025-12-16",
    displayDate: "2025.12.16",
    result: "인용",
    resultDetail: "분할안 확정",
    overview: ["상속인 사이에서 상속재산의 범위와 분할 방법이 다투어진 사건입니다."],
    issues: ["상속재산 범위", "기여분과 특별수익 반영 여부"],
    strategy: ["재산 내역과 생전 이전 자료를 정리하여 합리적인 분할 기준을 제시했습니다."],
    outcome: ["상속재산 분할 기준이 정리되어 장기간 지속되던 가족 간 분쟁을 마무리할 수 있었습니다."],
    keywords: ["상속", "상속재산분할", "가사"],
    relatedPracticeIds: ["inheritance"],
    relatedCaseSlugs: ["legal-reserve-return-2025", "example-slug-3"],
  },
  {
    slug: "legal-reserve-return-2025",
    categoryId: "family",
    categoryLabel: "이혼·가사",
    title: "유류분 반환 청구 사건",
    summary:
      "생전 증여와 상속재산 내역을 검토하여 유류분 부족액 산정과 반환 범위를 정리했습니다.",
    publishedAt: "2025-12-02",
    displayDate: "2025.12.02",
    result: "화해권고",
    resultDetail: "일부 반환",
    overview: ["상속 개시 이후 생전 증여 내역과 유류분 부족액 산정이 문제 된 사건입니다."],
    issues: ["유류분 산정의 기초재산", "생전 증여의 반영 범위"],
    strategy: ["상속재산 목록과 증여 자료를 정리해 반환 범위를 산정하고 화해 가능성을 검토했습니다."],
    outcome: ["일부 반환을 내용으로 하는 화해권고가 이루어져 분쟁을 정리할 수 있었습니다."],
    keywords: ["유류분", "상속", "가사"],
    relatedPracticeIds: ["inheritance"],
    relatedCaseSlugs: ["inheritance-division-judgment-2025", "example-slug-3"],
  },
];
