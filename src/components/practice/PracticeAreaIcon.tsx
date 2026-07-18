import type { PracticeAreaIcon as PracticeAreaIconType } from "@/data/practice";

type PracticeAreaIconProps = {
  type: PracticeAreaIconType;
  className?: string;
};

export function PracticeAreaIcon({
  type,
  className = "h-16 w-16",
}: PracticeAreaIconProps) {
  if (type === "scale") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 64 64">
        <path
          d="M32 12v40M18 20h28M24 20l-9 17h18L24 20ZM40 20l-9 17h18L40 20ZM22 52h20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 64 64">
        <path
          d="M18 10h22l10 10v34H18V10ZM40 10v10h10M27 29h15M27 37h11M27 45h8M42 47l7-7 5 5-7 7-7 2 2-7Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 64 64">
      <path
        d="M19 25a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM45 25a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM32 33a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM11 51V39c0-6 4-10 10-10M53 51V39c0-6-4-10-10-10M22 52V43c0-5 4-8 10-8s10 3 10 8v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
