type SectionHeadingProps = {
  title: string;
  description?: string;
  level?: 1 | 2;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  title,
  description,
  level = 2,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const HeadingTag = level === 1 ? "h1" : "h2";

  return (
    <>
      <HeadingTag className={titleClassName ?? "text-2xl font-semibold"}>
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={
            descriptionClassName ?? "mt-4 max-w-3xl leading-7 text-zinc-700"
          }
        >
          {description}
        </p>
      ) : null}
    </>
  );
}
