import type { CaseStudyImage } from "@/types/content/caseStudy";

type SanityImageDimensions = {
  width: number;
  height: number;
};

type SanityImageAsset = SanityImageDimensions & {
  id: string;
  extension: string;
};

type SanityImageUrlOptions = {
  width?: number;
  quality?: number;
};

const sanityImageRefPattern =
  /^image-([A-Za-z0-9]+)-(\d+)x(\d+)-([A-Za-z0-9]+)$/;

function getOptionalSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

  if (!projectId || !dataset) {
    return null;
  }

  return { projectId, dataset };
}

export function parseSanityImageAsset(ref: string): SanityImageAsset | null {
  const match = sanityImageRefPattern.exec(ref);

  if (!match) {
    return null;
  }

  const [, id, width, height, extension] = match;
  const parsedWidth = Number.parseInt(width, 10);
  const parsedHeight = Number.parseInt(height, 10);

  if (!Number.isFinite(parsedWidth) || !Number.isFinite(parsedHeight)) {
    return null;
  }

  if (parsedWidth <= 0 || parsedHeight <= 0) {
    return null;
  }

  return {
    id,
    width: parsedWidth,
    height: parsedHeight,
    extension: extension.toLowerCase(),
  };
}

function clampFraction(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, 0), 1);
}

export function getSanityImageCropRect(
  image: CaseStudyImage,
  asset: SanityImageAsset,
) {
  const crop = image.crop;

  if (!crop) {
    return {
      left: 0,
      top: 0,
      width: asset.width,
      height: asset.height,
    };
  }

  const leftCrop = clampFraction(crop.left, 0);
  const rightCrop = clampFraction(crop.right, 0);
  const topCrop = clampFraction(crop.top, 0);
  const bottomCrop = clampFraction(crop.bottom, 0);
  const left = Math.round(asset.width * leftCrop);
  const top = Math.round(asset.height * topCrop);
  const width = Math.round(asset.width * (1 - leftCrop - rightCrop));
  const height = Math.round(asset.height * (1 - topCrop - bottomCrop));

  if (width <= 0 || height <= 0) {
    return {
      left: 0,
      top: 0,
      width: asset.width,
      height: asset.height,
    };
  }

  return { left, top, width, height };
}

function appendPositiveInteger(
  searchParams: URLSearchParams,
  name: string,
  value: number | undefined,
) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return;
  }

  searchParams.set(name, String(Math.round(value)));
}

export function getSanityImageUrl(
  image: CaseStudyImage | undefined,
  options: SanityImageUrlOptions = {},
): string | null {
  if (!image) {
    return null;
  }

  const env = getOptionalSanityEnv();
  const asset = parseSanityImageAsset(image.asset.ref);

  if (!env || !asset) {
    return null;
  }

  const imagePath = `${asset.id}-${asset.width}x${asset.height}.${asset.extension}`;
  const url = new URL(
    `https://cdn.sanity.io/images/${env.projectId}/${env.dataset}/${imagePath}`,
  );
  const cropRect = getSanityImageCropRect(image, asset);

  if (
    cropRect.left > 0 ||
    cropRect.top > 0 ||
    cropRect.width !== asset.width ||
    cropRect.height !== asset.height
  ) {
    url.searchParams.set(
      "rect",
      [cropRect.left, cropRect.top, cropRect.width, cropRect.height].join(","),
    );
  }

  appendPositiveInteger(url.searchParams, "w", options.width);
  appendPositiveInteger(url.searchParams, "q", options.quality);
  url.searchParams.set("auto", "format");

  return url.toString();
}

export function getSanityImageObjectPosition(
  image: CaseStudyImage | undefined,
): string | undefined {
  if (!image?.hotspot) {
    return undefined;
  }

  const x = clampFraction(image.hotspot.x, 0.5) * 100;
  const y = clampFraction(image.hotspot.y, 0.5) * 100;

  return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
}
