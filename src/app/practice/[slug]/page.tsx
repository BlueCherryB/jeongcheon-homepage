import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PracticeDetailPage } from "@/components/practice/PracticeDetailPage";
import { getPracticeAreaBySlug, practiceAreas } from "@/data/practice";
import { filterCases, sortCasesLatestFirst } from "@/lib/cases";
import { getCaseStudies } from "@/lib/content/caseStudies";

type PracticeDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: PracticeDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    return {};
  }

  return {
    title: `${area.title} | 업무 분야 | 법률사무소 정천`,
    description: area.metadataDescription,
    alternates: {
      canonical: area.href,
    },
  };
}

export default async function PracticeDetailRoute({
  params,
}: PracticeDetailRouteProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const relatedCases = filterCases(
    sortCasesLatestFirst(await getCaseStudies()),
    area.category,
  ).slice(0, 3);

  return <PracticeDetailPage area={area} relatedCases={relatedCases} />;
}
