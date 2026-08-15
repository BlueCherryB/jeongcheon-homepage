import type { ReactNode } from "react";

import type {
  CaseStudyPortableText,
  CaseStudyPortableTextBlock,
} from "@/types/content/caseStudy";

type PortableTextContentProps = {
  value: CaseStudyPortableText;
  variant?: "paragraphs" | "list" | "article";
};

type PortableTextSpan = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function getSpanChildren(block: CaseStudyPortableTextBlock): PortableTextSpan[] {
  if (!Array.isArray(block.children)) {
    return [];
  }

  return block.children.filter((child): child is PortableTextSpan => {
    if (!isRecord(child)) {
      return false;
    }

    return child._type === "span" && typeof child.text === "string";
  });
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

function getRenderableBlocks(value: CaseStudyPortableText) {
  return value.filter((block) => {
    if (block._type !== "block") {
      return false;
    }

    return getSpanChildren(block).some((span) => span.text?.trim());
  });
}

function getBlockString(block: CaseStudyPortableTextBlock, property: string): string | undefined {
  const value = block[property];

  return typeof value === "string" ? value : undefined;
}

function ArticleBlock({block}: {block: CaseStudyPortableTextBlock}) {
  const style = getBlockString(block, "style");
  const listItem = getBlockString(block, "listItem");
  const content = renderBlockText(block);

  if (listItem === "bullet" || listItem === "number") {
    const ListTag = listItem === "number" ? "ol" : "ul";

    return (
      <ListTag className="ml-5 list-outside space-y-2.5 pl-1 marker:text-[#C8A96A]">
        <li>{content}</li>
      </ListTag>
    );
  }

  if (style === "h2") {
    return <h2 className="pt-5 text-2xl font-semibold leading-snug text-[#111B36]">{content}</h2>;
  }

  if (style === "h3") {
    return <h3 className="pt-3 text-lg font-semibold leading-snug text-[#111B36]">{content}</h3>;
  }

  return <p>{content}</p>;
}

export function portableTextToPlainText(value: CaseStudyPortableText): string {
  return getRenderableBlocks(value)
    .map((block) =>
      getSpanChildren(block)
        .map((span) => span.text ?? "")
        .join(""),
    )
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function PortableTextContent({
  value,
  variant = "paragraphs",
}: PortableTextContentProps) {
  const blocks = getRenderableBlocks(value);

  if (blocks.length === 0) {
    return null;
  }

  if (variant === "list") {
    return (
      <ul className="space-y-3.5">
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
    return (
      <div className="space-y-5 text-[17px] leading-8 text-zinc-700 sm:text-lg sm:leading-9">
        {blocks.map((block) => (
          <ArticleBlock key={block._key} block={block} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <p key={block._key}>{renderBlockText(block)}</p>
      ))}
    </div>
  );
}
