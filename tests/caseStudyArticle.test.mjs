import assert from "node:assert/strict";
import { test } from "node:test";

import {
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
