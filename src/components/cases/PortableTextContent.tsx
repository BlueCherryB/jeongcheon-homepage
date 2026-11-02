import type { ReactNode } from "react";

import {
  getArticleBlockSpacingClassName,
  getArticleBlocks,
  getRenderableBlocks,
  getSpacerHeightClassName,
  getSpanChildren,
  isArticleSpacer,
} from "@/lib/content/caseStudyArticle";
export { portableTextToPlainText } from "@/lib/content/caseStudyArticle";

import type {
  CaseStudyPortableText,
  CaseStudyPortableTextBlock,
} from "@/types/content/caseStudy";

type PortableTextContentProps = {
  value: CaseStudyPortableText;
  variant?: "paragraphs" | "list" | "article";
  tone?: "default" | "caseStudy";
};

type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function getMarkDefs(block: CaseStudyPortableTextBlock): PortableTextMarkDef[] {
  if (!Array.isArray(block.markDefs)) {
    return [];
  }

  return block.markDefs.filter((markDef): markDef is PortableTextMarkDef => {
    if (!isRecord(markDef)) {
      return false;
    }

    return typeof markDef._key === "string" && typeof markDef._type === "string";
  });
}

function isSafeHref(href: string): boolean {
  return (
    href.startsWith("/") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:")
  );
}

function renderMarkedText(
  text: string,
  marks: string[],
  markDefs: PortableTextMarkDef[],
): ReactNode {
  return marks.reduce<ReactNode>((content, mark) => {
    if (mark === "strong") {
      return <strong className="font-semibold">{content}</strong>;
    }

    if (mark === "em" || mark === "emphasis") {
      return <em>{content}</em>;
    }

    const markDef = markDefs.find((item) => item._key === mark);

    if (markDef?._type === "link" && markDef.href && isSafeHref(markDef.href)) {
      return (
        <a
          href={markDef.href}
          className="font-semibold text-[#111B36] underline decoration-[#C8A96A]/60 underline-offset-4 transition-colors hover:text-[#9F7F37]"
        >
          {content}
        </a>
      );
    }

    return content;
  }, text);
}

function renderBlockText(block: CaseStudyPortableTextBlock): ReactNode[] {
  const markDefs = getMarkDefs(block);

  return getSpanChildren(block).map((span, index) => (
    <span key={span._key ?? `${block._key}-${index}`}>
      {renderMarkedText(span.text ?? "", span.marks ?? [], markDefs)}
    </span>
  ));
}

function getBlockString(block: CaseStudyPortableTextBlock, property: string): string | undefined {
  const value = block[property];

  return typeof value === "string" ? value : undefined;
}

function headingColor(tone: PortableTextContentProps["tone"]): string {
  return tone === "caseStudy" ? "text-[#18181B]" : "text-[#111B36]";
}

function ArticleBlock({
  block,
  className,
  tone,
}: {
  block: CaseStudyPortableTextBlock;
  className: string;
  tone: PortableTextContentProps["tone"];
}) {
  const style = getBlockString(block, "style");
  const listItem = getBlockString(block, "listItem");
  const content = renderBlockText(block);

  if (listItem === "bullet" || listItem === "number") {
    const ListTag = listItem === "number" ? "ol" : "ul";
    const listClassName =
      listItem === "number"
        ? "ml-5 list-outside list-decimal space-y-2.5 pl-1 marker:text-[#C8A96A]"
        : "ml-5 list-outside list-disc space-y-2.5 pl-1 marker:text-[#C8A96A]";

    return (
      <ListTag className={`${className} ${listClassName}`}>
        <li>{content}</li>
      </ListTag>
    );
  }

  if (style === "h2") {
    return <h2 className={`${className} text-2xl font-semibold leading-snug ${headingColor(tone)}`}>{content}</h2>;
  }

  if (style === "h3") {
    return <h3 className={`${className} text-lg font-semibold leading-snug ${headingColor(tone)}`}>{content}</h3>;
  }

  return <p className={className}>{content}</p>;
}

function ArticleSpacer({block}: {block: CaseStudyPortableTextBlock}) {
  const size = getBlockString(block, "size");
  return <div aria-hidden="true" className={getSpacerHeightClassName(size)} />;
}

function ParagraphBlock({
  block,
  tone,
}: {
  block: CaseStudyPortableTextBlock;
  tone: PortableTextContentProps["tone"];
}) {
  const style = getBlockString(block, "style");
  const listItem = getBlockString(block, "listItem");
  const content = renderBlockText(block);

  if (listItem === "bullet" || listItem === "number") {
    const ListTag = listItem === "number" ? "ol" : "ul";
    const listClassName =
      listItem === "number"
        ? "ml-5 list-outside list-decimal space-y-2.5 pl-1 marker:text-[#C8A96A]"
        : "ml-5 list-outside list-disc space-y-2.5 pl-1 marker:text-[#C8A96A]";

    return (
      <ListTag className={listClassName}>
        <li>{content}</li>
      </ListTag>
    );
  }

  if (style === "h2") {
    return <h2 className={`pt-5 ${tone === "caseStudy" ? "text-lg" : "text-2xl"} font-semibold leading-snug ${headingColor(tone)}`}>{content}</h2>;
  }

  if (style === "h3") {
    return <h3 className={`pt-3 ${tone === "caseStudy" ? "text-base" : "text-lg"} font-semibold leading-snug ${headingColor(tone)}`}>{content}</h3>;
  }

  return <p>{content}</p>;
}

export function PortableTextContent({
  value,
  variant = "paragraphs",
  tone = "default",
}: PortableTextContentProps) {
  const blocks = getRenderableBlocks(value);

  if (blocks.length === 0) {
    return null;
  }

  if (variant === "list") {
    return (
      <ul className={`space-y-3.5 ${tone === "caseStudy" ? "text-[#27272A]" : ""}`}>
        {blocks.map((block) => (
          <li key={block._key} className="flex gap-3.5">
            <span
              aria-hidden="true"
              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A96A]"
            />
            <span>{renderBlockText(block)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "article") {
    const articleBlocks = getArticleBlocks(value);

    return (
      <div
        className={`text-[17px] leading-8 sm:text-lg sm:leading-9 ${tone === "caseStudy" ? "text-[#27272A]" : "text-zinc-700"}`}
      >
        {articleBlocks.map((block, index) =>
          isArticleSpacer(block) ? (
            <ArticleSpacer key={block._key} block={block} />
          ) : (
            <ArticleBlock
              key={block._key}
              block={block}
              className={getArticleBlockSpacingClassName(block, articleBlocks[index - 1])}
              tone={tone}
            />
          ),
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-6 lg:space-y-4 ${tone === "caseStudy" ? "text-[#27272A]" : ""}`}>
      {blocks.map((block) => (
        <ParagraphBlock key={block._key} block={block} tone={tone} />
      ))}
    </div>
  );
}
