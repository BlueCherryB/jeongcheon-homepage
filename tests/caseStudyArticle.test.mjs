import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getArticleBlockSpacingClassName,
  getArticleBlocks,
  getArticleHeadingNumbers,
  getLegacyCaseStudySections,
  getRenderableBlocks,
  getSpacerHeightClassName,
  portableTextToPlainText,
  withoutLeadingSectionNumber,
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

test("legacy sections are numbered in rendered order", () => {
  const caseStudy = {
    overview: [paragraph("overview", "개요")],
    issues: [paragraph("issues", "쟁점")],
    response: [paragraph("response", "조력")],
    outcome: [paragraph("outcome", "결과")],
    legalIssuesUseBullets: true,
  };

  assert.deepEqual(
    getLegacyCaseStudySections(caseStudy).map(({number, title, icon, variant}) => ({number, title, icon, variant})),
    [
      {number: 1, title: "사건의 개요", icon: "document", variant: "paragraphs"},
      {number: 2, title: "주요 쟁점", icon: "search", variant: "list"},
      {number: 3, title: "변호인의 대응·조력", icon: "document", variant: "paragraphs"},
      {number: 4, title: "사건의 결과", icon: "result", variant: "paragraphs"},
    ],
  );

  caseStudy.response = [paragraph("empty", " ")];
  assert.deepEqual(
    getLegacyCaseStudySections(caseStudy).map(({number, title}) => ({number, title})),
    [
      {number: 1, title: "사건의 개요"},
      {number: 2, title: "주요 쟁점"},
      {number: 3, title: "사건의 결과"},
    ],
  );
});

test("mobile H2 display removes only clearly separated section numbers", () => {
  for (const text of [
    "2. 사건의 경위",
    "2) 사건의 경위",
    "2 사건의 경위",
    "02. 사건의 경위",
    "02) 사건의 경위",
    "02 사건의 경위",
    "  3. 사건의 경위",
  ]) {
    const block = {...paragraph("heading", text), style: "h2"};
    assert.equal(portableTextToPlainText([withoutLeadingSectionNumber(block)]), "사건의 경위");
    assert.equal(portableTextToPlainText([block]), text.trim());
  }

  for (const text of [
    "사건의 경위",
    "2026년 개정 법률의 주요 내용",
    "3억원 손해배상청구 사례",
    "10대 청소년 관련 사건",
    "3D 영상분석 관련 분쟁",
    "2.",
    "2. ",
  ]) {
    const block = {...paragraph("heading", text), style: "h2"};
    assert.equal(withoutLeadingSectionNumber(block), block);
  }
});

test("prefix removal across spans preserves marks, links, keys, and source data", () => {
  const block = {
    _key: "heading",
    _type: "block",
    style: "h2",
    markDefs: [{_key: "link", _type: "link", href: "/cases"}],
    children: [
      {_key: "prefix", _type: "span", text: " 02"},
      {_key: "separator", _type: "span", text: ". "},
      {_key: "bold", _type: "span", text: "대화를 녹음하는 행위", marks: ["strong"]},
      {_key: "linked", _type: "span", text: " 관련 법률", marks: ["link"]},
    ],
  };

  const display = withoutLeadingSectionNumber(block);
  assert.equal(portableTextToPlainText([display]), "대화를 녹음하는 행위 관련 법률");
  assert.deepEqual(display.children.map((span) => span._key), block.children.map((span) => span._key));
  assert.deepEqual(display.children[2].marks, ["strong"]);
  assert.deepEqual(display.children[3].marks, ["link"]);
  assert.equal(display.markDefs, block.markDefs);
  assert.equal(block.children[0].text, " 02");
  assert.equal(block.children[1].text, ". ");
});

test("only nonempty H2 blocks advance the section number", () => {
  const blocks = [
    {...paragraph("first", "3. 첫 제목"), style: "h2"},
    {...paragraph("subheading", "하위 제목"), style: "h3"},
    paragraph("body", "본문"),
    {_key: "space", _type: "articleSpacer", size: "large"},
    {...paragraph("empty", " "), style: "h2"},
    {...paragraph("second", "2) 둘째 제목"), style: "h2"},
  ];

  assert.deepEqual([...getArticleHeadingNumbers(blocks)], [["first", 1], ["second", 2]]);
  assert.deepEqual(blocks.map((block) => block.children?.[0]?.text).filter(Boolean), [
    "3. 첫 제목", "하위 제목", "본문", " ", "2) 둘째 제목",
  ]);
});
