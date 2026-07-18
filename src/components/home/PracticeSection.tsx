import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageContent } from "@/data/homepage";

type PracticeIconProps = {
  type: "scale" | "document" | "family";
};

function PracticeIcon({ type }: PracticeIconProps) {
  if (type === "scale") {
    return (
      <svg
        aria-hidden="true"
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 64 64"
      >
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
      <svg
        aria-hidden="true"
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 64 64"
      >
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
    <svg
      aria-hidden="true"
      className="h-16 w-16"
      fill="none"
      viewBox="0 0 64 64"
    >
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

export function PracticeSection() {
  const { practice } = homepageContent;

  return (
    <section id={practice.id} className="bg-[#FAF8F4]">
      <Container className="py-24 lg:py-32">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl font-semibold tracking-wide text-[#C8A96A] sm:text-2xl">
              {practice.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="mt-2.5 h-px w-28 bg-[#C8A96A]"
            />
          </div>

          <SectionHeading
            title={practice.message}
            titleClassName="font-chosun mx-auto mt-12 max-w-4xl whitespace-pre-line text-[28px] font-normal leading-[1.55] tracking-[-0.02em] text-[#111B36] sm:text-[32px] lg:text-[34px]"
          />
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practice.areas.map((area) => (
            <article
              key={area.title}
              className="group flex min-h-[470px] flex-col rounded-[22px] border border-[#E8E2D7] bg-white px-10 py-12 shadow-[0_18px_50px_rgba(17,27,54,0.07)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-[#C8A96A]/70 hover:shadow-[0_24px_70px_rgba(17,27,54,0.12)]"
            >
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#F3EEE6] text-[#C8A96A]">
                <PracticeIcon type={area.icon} />
              </div>

              <span
                aria-hidden="true"
                className="mx-auto mt-7 h-px w-14 bg-[#C8A96A]"
              />

              <h3 className="font-chosun mt-6 text-center text-[36px] font-normal leading-tight tracking-[-0.02em] text-[#111B36]">
                {area.title}
              </h3>

              <span
                aria-hidden="true"
                className="mt-8 h-px w-full bg-[#C8A96A]/55"
              />

              <ul className="mt-6">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-[#E8E2D7]/70 py-3.5 text-base font-medium text-[#111B36] last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C8A96A] text-sm leading-none text-[#C8A96A]"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Restore this detail link after practice area detail pages are implemented.
              <Button
                href={area.href}
                variant="secondary"
                className="group/link mx-auto mt-auto translate-y-3 border-transparent bg-transparent px-0 pb-3 pt-4 text-base font-semibold text-[#111B36] hover:bg-transparent hover:text-[#C8A96A] focus-visible:outline-[#C8A96A]"
              >
                <span>자세히 보기</span>
                <span
                  aria-hidden="true"
                  className="ml-3 text-[#C8A96A] transition-transform group-hover/link:translate-x-1"
                >
                  →
                </span>
              </Button>
              */}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
