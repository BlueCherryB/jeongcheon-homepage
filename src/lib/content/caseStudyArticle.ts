import type {
  CaseStudyPortableText,
  CaseStudyPortableTextBlock,
} from "@/types/content/caseStudy";

export type PortableTextSpan = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function getSpanChildren(block: CaseStudyPortableTextBlock): PortableTextSpan[] {
  if (!Array.isArray(block.children)) {
    return [];
  }

  return block.children.filter((child): child is PortableTextSpan =>
    isRecord(child) && child._type === "span" && typeof child.text === "string",
  );
}

export function getRenderableBlocks(value: CaseStudyPortableText): CaseStudyPortableText {
  return value.filter(isMeaningfulTextBlock);
}

function isMeaningfulTextBlock(block: CaseStudyPortableTextBlock): boolean {
  return block._type === "block" && getSpanChildren(block).some((span) => span.text?.trim());
}

export function isArticleSpacer(block: CaseStudyPortableTextBlock): boolean {
  return block._type === "articleSpacer";
}

export function getArticleBlocks(value: CaseStudyPortableText): CaseStudyPortableText {
  return value.filter((block) => isArticleSpacer(block) || isMeaningfulTextBlock(block));
}

export function getSpacerHeightClassName(size: unknown): string {
  return size === "small" ? "h-4" : size === "large" ? "h-12" : "h-8";
}

export function getArticleBlockSpacingClassName(
  block: CaseStudyPortableTextBlock,
  previousBlock: CaseStudyPortableTextBlock | undefined,
): string {
  if (!previousBlock || isArticleSpacer(previousBlock)) {
    return "";
  }

  if (block.style === "h2") {
    return "mt-12";
  }

  if (block.style === "h3") {
    return "mt-9";
  }

  if (previousBlock.style === "h2") {
    return "mt-5";
  }

  if (previousBlock.style === "h3") {
    return "mt-4";
  }

  return "mt-6";
}

export function portableTextToPlainText(value: CaseStudyPortableText): string {
  return getRenderableBlocks(value)
    .map((block) => getSpanChildren(block).map((span) => span.text ?? "").join(""))
    .filter(Boolean)
    .join(" ")
    .trim();
}
