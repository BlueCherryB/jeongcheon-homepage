import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800",
  secondary: "border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-50",
};

export function Button({ children, href, variant = "primary" }: ButtonProps) {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center justify-center border px-5 py-3 text-sm font-medium transition-colors",
        variantClasses[variant],
      ].join(" ")}
    >
      {children}
    </a>
  );
}
