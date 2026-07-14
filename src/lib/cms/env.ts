type SanityPublicEnvName =
  | "NEXT_PUBLIC_SANITY_PROJECT_ID"
  | "NEXT_PUBLIC_SANITY_DATASET"
  | "NEXT_PUBLIC_SANITY_API_VERSION";

type SanityPublicEnvInput = Partial<Record<SanityPublicEnvName, string>> &
  Record<string, string | undefined>;

type SanityPublicEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

const projectIdPattern = /^[a-z0-9]+$/;
const datasetPattern = /^[a-z0-9][a-z0-9_-]*$/;
const apiVersionPattern = /^\d{4}-\d{2}-\d{2}$/;

function requireNonEmptyEnv(
  name: SanityPublicEnvName,
  value: string | undefined,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Missing ${name}. Add it to .env.local or the deployment environment settings.`,
    );
  }

  if (value !== value.trim()) {
    throw new Error(`${name} must not include leading or trailing whitespace.`);
  }

  return value;
}

function isRealCalendarDate(value: string): boolean {
  if (!apiVersionPattern.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function readSanityPublicEnv(env: SanityPublicEnvInput = process.env): SanityPublicEnv {
  const projectId = requireNonEmptyEnv(
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  );
  const dataset = requireNonEmptyEnv(
    "NEXT_PUBLIC_SANITY_DATASET",
    env.NEXT_PUBLIC_SANITY_DATASET,
  );
  const apiVersion = requireNonEmptyEnv(
    "NEXT_PUBLIC_SANITY_API_VERSION",
    env.NEXT_PUBLIC_SANITY_API_VERSION,
  );

  if (!projectIdPattern.test(projectId)) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID must use lowercase letters and numbers only.",
    );
  }

  if (!datasetPattern.test(dataset)) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_DATASET must use lowercase letters, numbers, hyphens, or underscores.",
    );
  }

  if (!isRealCalendarDate(apiVersion)) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_API_VERSION must be a real date in YYYY-MM-DD format.",
    );
  }

  return {
    projectId,
    dataset,
    apiVersion,
  };
}

const sanityPublicEnv = readSanityPublicEnv();

export const sanityProjectId = sanityPublicEnv.projectId;
export const sanityDataset = sanityPublicEnv.dataset;
export const sanityApiVersion = sanityPublicEnv.apiVersion;
