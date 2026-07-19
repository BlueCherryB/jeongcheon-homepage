import type { Metadata } from "next";

import { AttorneyHero } from "@/components/attorney/AttorneyHero";
import { AttorneySections } from "@/components/attorney/AttorneySections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { attorneyProfile } from "@/data/attorney";
import { getFeaturedCaseStudies } from "@/lib/content/caseStudies";
import { buildAttorneyPageStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: `${attorneyProfile.name} 소개 | 법률사무소 정천`,
  description: attorneyProfile.seoDescription,
  keywords: [
    attorneyProfile.name,
    "법률사무소 정천",
    "변호사 소개",
    ...attorneyProfile.specialties,
  ],
  alternates: {
    canonical: "/attorney",
  },
  openGraph: {
    title: `${attorneyProfile.name} 소개 | 법률사무소 정천`,
    description: attorneyProfile.seoDescription,
    url: "/attorney",
    type: "profile",
  },
};

export default async function AttorneyPage() {
  const representativeCases = (await getFeaturedCaseStudies()).slice(0, 3);

  return (
    <>
      <main className="bg-white text-[#111B36]">
        <JsonLdScript
          id="attorney-structured-data"
          data={buildAttorneyPageStructuredData()}
        />
        <AttorneyHero attorney={attorneyProfile} />
        <AttorneySections
          attorney={attorneyProfile}
          representativeCases={representativeCases}
        />
      </main>
    </>
  );
}
