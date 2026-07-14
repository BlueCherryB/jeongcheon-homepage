import { AttorneySection } from "@/components/home/AttorneySection";
import { CasesSection } from "@/components/home/CasesSection";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PracticeSection } from "@/components/home/PracticeSection";
import { getFeaturedCaseStudies } from "@/lib/content/caseStudies";

const homepageCaseStudyLimit = 5;

export default async function Home() {
  const caseStudies = (await getFeaturedCaseStudies()).slice(
    0,
    homepageCaseStudyLimit,
  );

  return (
    <main className="flex flex-1 flex-col bg-white text-zinc-950">
      <HeroSection />
      <AttorneySection />
      <PracticeSection />
      <CasesSection caseStudies={caseStudies} />
      <ConsultationSection />
    </main>
  );
}
