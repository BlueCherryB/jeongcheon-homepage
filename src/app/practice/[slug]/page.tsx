import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PracticeDetailPage } from "@/components/practice/PracticeDetailPage";
import { getPracticeAreaBySlug, practiceAreas } from "@/data/practice";

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
    description: `법률사무소 정천의 ${area.title} 업무 분야 안내 페이지입니다.`,
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

  return <PracticeDetailPage area={area} />;
}
