import type { Metadata } from "next";

import { AttorneyHero } from "@/components/attorney/AttorneyHero";
import { AttorneySections } from "@/components/attorney/AttorneySections";
import { attorneyProfile } from "@/data/attorney";
import { getFeaturedCaseStudies } from "@/lib/content/caseStudies";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorneyProfile.name,
    jobTitle: attorneyProfile.role,
    image: attorneyProfile.imageSrc,
    description: attorneyProfile.seoDescription,
    url: "/attorney",
    worksFor: {
      "@type": "LegalService",
      name: "법률사무소 정천",
    },
    knowsAbout: attorneyProfile.specialties,
  };

  return (
    <>
      <main className="bg-white text-[#111B36]">
        <AttorneyHero attorney={attorneyProfile} />
        <AttorneySections
          attorney={attorneyProfile}
          representativeCases={representativeCases}
        />
      </main>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
