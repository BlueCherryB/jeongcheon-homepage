import { unstable_cache } from "next/cache";

import { cmsCacheTags } from "@/lib/cms/cacheTags";
import { getCaseStudies } from "@/lib/content/caseStudies";
import type {
  CaseStudyCategory,
  CaseStudyListItem,
} from "@/types/content/caseStudy";

const featuredCaseStudyLimit = 5;

const featuredCategoryCounts: ReadonlyArray<
  Readonly<{ category: CaseStudyCategory; count: number }>
> = [
  { category: "criminal", count: 3 },
  { category: "civil", count: 1 },
  { category: "family", count: 1 },
];

const koreanDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function getRotationDateKey(date: Date): string {
  return koreanDateFormatter.format(date);
}

function hashSeed(value: string): number {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed);

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const shuffled = [...items];
  const random = createSeededRandom(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function uniqueCaseStudies(
  caseStudies: readonly CaseStudyListItem[],
): CaseStudyListItem[] {
  const uniqueById = new Map<string, CaseStudyListItem>();

  for (const caseStudy of caseStudies) {
    uniqueById.set(caseStudy.id, caseStudy);
  }

  return [...uniqueById.values()];
}

function selectFeaturedCaseStudies(
  caseStudies: readonly CaseStudyListItem[],
  rotationDateKey: string,
): CaseStudyListItem[] {
  const shuffledCaseStudies = seededShuffle(
    uniqueCaseStudies(caseStudies),
    rotationDateKey,
  );
  const selectedCaseStudies: CaseStudyListItem[] = [];
  const selectedIds = new Set<string>();

  for (const { category, count } of featuredCategoryCounts) {
    let selectedForCategory = 0;

    for (const caseStudy of shuffledCaseStudies) {
      if (
        selectedCaseStudies.length >= featuredCaseStudyLimit ||
        selectedIds.has(caseStudy.id) ||
        caseStudy.category !== category
      ) {
        continue;
      }

      selectedCaseStudies.push(caseStudy);
      selectedIds.add(caseStudy.id);
      selectedForCategory += 1;

      if (selectedForCategory === count) {
        break;
      }
    }
  }

  for (const caseStudy of shuffledCaseStudies) {
    if (selectedCaseStudies.length >= featuredCaseStudyLimit) {
      break;
    }

    if (!selectedIds.has(caseStudy.id)) {
      selectedCaseStudies.push(caseStudy);
      selectedIds.add(caseStudy.id);
    }
  }

  return selectedCaseStudies;
}

export function selectDailyFeaturedCaseStudies(
  caseStudies: readonly CaseStudyListItem[],
  date: Date = new Date(),
): CaseStudyListItem[] {
  return selectFeaturedCaseStudies(caseStudies, getRotationDateKey(date));
}

function getCachedDailyFeaturedCaseStudies(rotationDateKey: string) {
  return unstable_cache(
    async () => selectFeaturedCaseStudies(await getCaseStudies(), rotationDateKey),
    ["daily-featured-case-studies", rotationDateKey],
    {
      revalidate: 86400,
      tags: [cmsCacheTags.caseStudies],
    },
  )();
}

export function getDailyFeaturedCaseStudies(): Promise<CaseStudyListItem[]> {
  return getCachedDailyFeaturedCaseStudies(getRotationDateKey(new Date()));
}
