import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-[#0F172A] bg-[#0F172A] text-white hover:bg-[#17213A] focus-visible:outline-[#0F172A]",
  secondary:
    "border-zinc-300 bg-white text-[#0F172A] hover:bg-zinc-50 focus-visible:outline-[#C8A96A]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center justify-center border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
