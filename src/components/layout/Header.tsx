const navigationItems = [
  { label: "변호사 소개", href: "#attorney" },
  { label: "업무 분야", href: "#practice" },
  { label: "사례", href: "#cases" },
  { label: "법률 글", href: "#articles" },
  { label: "자주 묻는 질문", href: "#faq" },
  { label: "상담 안내", href: "#contact" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-zinc-950">정천 법률사무소</p>
        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-700">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-zinc-950">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
