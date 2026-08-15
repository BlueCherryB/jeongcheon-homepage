export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "변호사 소개", href: "/attorney" },
  { label: "업무 분야", href: "/practice" },
  { label: "수행 사례", href: "/cases" },
  { label: "법률 정보", href: "/legal-info" },
  // Temporarily hidden until the FAQ section is restored.
  // { label: "자주 묻는 질문", href: "/#faq" },
];
