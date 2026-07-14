import type { ReactNode } from "react";

import type {
  CaseStudyPortableText,
  CaseStudyPortableTextBlock,
} from "@/types/content/caseStudy";

type PortableTextContentProps = {
  value: CaseStudyPortableText;
  variant?: "paragraphs" | "list";
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
      <ul className="space-y-3">
        {blocks.map((block) => (
          <li key={block._key} className="flex gap-3">
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

  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <p key={block._key}>{renderBlockText(block)}</p>
      ))}
    </div>
  );
}
