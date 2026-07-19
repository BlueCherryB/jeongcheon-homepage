export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "변호사 소개", href: "/attorney" },
  { label: "업무 분야", href: "/practice" },
  { label: "수행사례", href: "/cases" },
  // Temporarily hidden until the legal information and FAQ sections are restored.
  // { label: "법률 정보", href: "/#articles" },
  // { label: "자주 묻는 질문", href: "/#faq" },
];
