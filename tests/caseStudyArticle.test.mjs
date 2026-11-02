import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getArticleBlockSpacingClassName,
  getArticleBlocks,
  getRenderableBlocks,
  getSpacerHeightClassName,
  portableTextToPlainText,
} from "../src/lib/content/caseStudyArticle.ts";

const paragraph = (key, text) => ({
  _key: key,
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text }],
});

test("legacy article paragraphs remain unchanged", () => {
  const blocks = [paragraph("first", "첫 문단"), paragraph("second", "둘째 문단")];

  assert.deepEqual(getArticleBlocks(blocks), blocks);
  assert.equal(portableTextToPlainText(blocks), "첫 문단 둘째 문단");
});

test("spacers render in order but never become article or SEO text", () => {
  const spacer = { _key: "space", _type: "articleSpacer", size: "large" };
  const blocks = [paragraph("first", "첫 문단"), spacer, paragraph("second", "둘째 문단")];

  assert.deepEqual(getArticleBlocks(blocks), blocks);
  assert.deepEqual(getRenderableBlocks(blocks).map((block) => block._key), ["first", "second"]);
  assert.equal(portableTextToPlainText(blocks), "첫 문단 둘째 문단");
  assert.equal(portableTextToPlainText([spacer]), "");
});

test("empty paragraphs do not hide the first meaningful block in a summary", () => {
  const blocks = [paragraph("empty", " "), { _key: "space", _type: "articleSpacer" }, paragraph("real", "본문")];

  assert.deepEqual(getRenderableBlocks(blocks).map((block) => block._key), ["real"]);
  assert.equal(portableTextToPlainText(blocks), "본문");
});

test("spacer sizes are exact, with medium as the fallback", () => {
  assert.equal(getSpacerHeightClassName("small"), "h-4");
  assert.equal(getSpacerHeightClassName("medium"), "h-8");
  assert.equal(getSpacerHeightClassName("large"), "h-12");
  assert.equal(getSpacerHeightClassName(undefined), "h-8");
});

test("consecutive article paragraphs and headings receive contextual spacing", () => {
  const first = paragraph("first", "첫 문단");
  const second = paragraph("second", "둘째 문단");
  const h2 = { ...paragraph("heading", "큰 제목"), style: "h2" };
  const h3 = { ...paragraph("subheading", "작은 제목"), style: "h3" };

  assert.equal(getArticleBlockSpacingClassName(first, undefined), "");
  assert.equal(getArticleBlockSpacingClassName(second, first), "mt-6");
  assert.equal(getArticleBlockSpacingClassName(h2, second), "mt-12");
  assert.equal(getArticleBlockSpacingClassName(second, h2), "mt-5");
  assert.equal(getArticleBlockSpacingClassName(h3, second), "mt-9");
  assert.equal(getArticleBlockSpacingClassName(second, h3), "mt-4");
});

test("case_028-style spacer and heading sequence does not stack automatic margins", () => {
  const spacer = { _key: "space", _type: "articleSpacer", size: "large" };
  const blocks = [
    paragraph("intro", "사건 소개"),
    spacer,
    { ...paragraph("heading", "사건의 개요"), style: "h2" },
    paragraph("body", "본문"),
  ];

  assert.equal(getArticleBlockSpacingClassName(blocks[2], blocks[1]), "");
  assert.equal(getArticleBlockSpacingClassName(blocks[3], blocks[2]), "mt-5");
  assert.equal(getSpacerHeightClassName(spacer.size), "h-12");
  assert.equal(portableTextToPlainText(blocks), "사건 소개 사건의 개요 본문");
});
