import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  bordered?: boolean;
  spacing?: "hero" | "default";
};

export function Section({
  children,
  id,
  bordered = true,
  spacing = "default",
}: SectionProps) {
  const sectionClassName = bordered ? "border-t border-zinc-200" : undefined;
  const spacingClassName = spacing === "hero" ? "py-20" : "py-16";

  return (
    <section id={id} className={sectionClassName}>
      <Container className={spacingClassName}>{children}</Container>
    </section>
  );
}
