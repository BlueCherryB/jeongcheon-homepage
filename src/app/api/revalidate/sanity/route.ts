import { timingSafeEqual } from "node:crypto";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const revalidateSecretHeader = "x-sanity-revalidate-secret";
const detailPathPrefix = "/cases/";

type SanitySlugValue =
  | string
  | {
      current?: unknown;
    };

type SanityWebhookPayload = {
  _type?: unknown;
  operation?: unknown;
  transition?: unknown;
  slug?: SanitySlugValue;
  currentSlug?: SanitySlugValue;
  previousSlug?: SanitySlugValue;
  before?: {
    slug?: SanitySlugValue;
  };
  after?: {
    slug?: SanitySlugValue;
  };
};

function jsonResponse(
  body: Record<string, unknown>,
  init?: ResponseInit,
): NextResponse {
  return NextResponse.json(body, init);
}

function getConfiguredSecret(): string | undefined {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  return secret || undefined;
}

function getRequestSecret(request: Request): string | undefined {
  const headerSecret = request.headers.get(revalidateSecretHeader)?.trim();
  const authorization = request.headers.get("authorization")?.trim();

  if (headerSecret) {
    return headerSecret;
  }

  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice("bearer ".length).trim() || undefined;
  }

  return undefined;
}

function secretsMatch(requestSecret: string, configuredSecret: string): boolean {
  const requestBuffer = Buffer.from(requestSecret);
  const configuredBuffer = Buffer.from(configuredSecret);

  if (requestBuffer.length !== configuredBuffer.length) {
    return false;
  }

  return timingSafeEqual(requestBuffer, configuredBuffer);
}

function readSlug(value: SanitySlugValue | undefined): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (value && typeof value.current === "string") {
    return value.current.trim() || undefined;
  }

  return undefined;
}

function normalizeDetailPath(slug: string | undefined): string | undefined {
  if (!slug) {
    return undefined;
  }

  if (slug.startsWith(detailPathPrefix)) {
    return slug;
  }

  return `${detailPathPrefix}${slug}`;
}

function uniquePaths(paths: Array<string | undefined>): string[] {
  return Array.from(new Set(paths.filter((path): path is string => Boolean(path))));
}

function getAffectedPaths(payload: SanityWebhookPayload): string[] {
  const currentSlug =
    readSlug(payload.currentSlug) ??
    readSlug(payload.slug) ??
    readSlug(payload.after?.slug);
  const previousSlug = readSlug(payload.previousSlug) ?? readSlug(payload.before?.slug);

  return uniquePaths([
    "/",
    "/cases",
    normalizeDetailPath(currentSlug),
    normalizeDetailPath(previousSlug),
  ]);
}

export function GET(): NextResponse {
  return jsonResponse(
    {
      ok: false,
      error: "Method not allowed. Use POST.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    },
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  const configuredSecret = getConfiguredSecret();
  const requestSecret = getRequestSecret(request);

  if (!configuredSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "Revalidation secret is not configured.",
      },
      { status: 500 },
    );
  }

  if (!requestSecret || !secretsMatch(requestSecret, configuredSecret)) {
    return jsonResponse(
      {
        ok: false,
        error: "Invalid revalidation secret.",
      },
      { status: 401 },
    );
  }

  let payload: SanityWebhookPayload;

  try {
    payload = (await request.json()) as SanityWebhookPayload;
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "Invalid JSON payload.",
      },
      { status: 400 },
    );
  }

  if (payload._type && payload._type !== "caseStudy") {
    return jsonResponse(
      {
        ok: false,
        error: "Unsupported document type.",
      },
      { status: 400 },
    );
  }

  const revalidatedPaths = getAffectedPaths(payload);

  for (const path of revalidatedPaths) {
    revalidatePath(path);
  }

  return jsonResponse({
    ok: true,
    revalidated: revalidatedPaths,
  });
}
