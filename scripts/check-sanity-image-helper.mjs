import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import vm from "node:vm";

import ts from "typescript";

const require = createRequire(import.meta.url);
const source = fs.readFileSync("src/lib/cms/sanityImage.ts", "utf8");
const output = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const sandbox = {
  exports: {},
  require(id) {
    if (id === "@/types/content/caseStudy") {
      return {};
    }

    return require(id);
  },
  process: {
    env: {},
  },
  URL,
  URLSearchParams,
  Number,
  Math,
};

vm.createContext(sandbox);
vm.runInContext(output, sandbox);

const {
  getSanityImageCropRect,
  getSanityImageObjectPosition,
  getSanityImageUrl,
  parseSanityImageAsset,
} = sandbox.exports;

const assetRef = "image-G3i4emG6B8JnTmGoN0UjgAp8-1200x800-jpg";

function withSanityEnv() {
  sandbox.process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "20zyfjea";
  sandbox.process.env.NEXT_PUBLIC_SANITY_DATASET = "production";
}

function withoutSanityEnv() {
  sandbox.process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "";
  sandbox.process.env.NEXT_PUBLIC_SANITY_DATASET = "";
}

function createImage(overrides = {}) {
  return {
    asset: {
      ref: assetRef,
      type: "reference",
    },
    alt: "수행사례 대표 이미지",
    ...overrides,
  };
}

withSanityEnv();
assert.equal(
  getSanityImageUrl(createImage(), {
    width: 420,
    quality: 80,
  }),
  "https://cdn.sanity.io/images/20zyfjea/production/G3i4emG6B8JnTmGoN0UjgAp8-1200x800.jpg?w=420&q=80&auto=format",
  "image without crop/hotspot should use width-only CDN URL",
);

const asset = parseSanityImageAsset(assetRef);
assert.ok(asset, "valid asset reference should parse");
assert.deepEqual(
  JSON.parse(
    JSON.stringify(
      getSanityImageCropRect(
        createImage({
          crop: {
            left: 0.1,
            right: 0.2,
            top: 0.05,
            bottom: 0.15,
          },
        }),
        asset,
      ),
    ),
  ),
  {
    left: 120,
    top: 40,
    width: 840,
    height: 640,
  },
  "image crop should convert to source rect",
);

assert.equal(
  getSanityImageObjectPosition(
    createImage({
      hotspot: {
        x: 0.35,
        y: 0.45,
      },
    }),
  ),
  "35.00% 45.00%",
  "image hotspot should convert to CSS object-position",
);

assert.equal(
  getSanityImageUrl(
    createImage({
      asset: {
        ref: "bad-ref",
        type: "reference",
      },
    }),
  ),
  null,
  "malformed asset reference should fall back",
);

withoutSanityEnv();
assert.equal(
  getSanityImageUrl(createImage()),
  null,
  "missing environment values should fall back",
);

console.log("Sanity image helper checks passed.");
