import { AttorneySection } from "@/components/home/AttorneySection";
import { CasesSection } from "@/components/home/CasesSection";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MobileOfficeBanner } from "@/components/home/MobileOfficeBanner";
import { PracticeSection } from "@/components/home/PracticeSection";
import { getDailyFeaturedCaseStudies } from "@/lib/content/featuredCaseStudies";

export const revalidate = 3600;

export default async function Home() {
  const caseStudies = await getDailyFeaturedCaseStudies();

  return (
    <main className="flex flex-1 flex-col bg-white text-zinc-950">
      <MobileOfficeBanner />
      <HeroSection />
      <AttorneySection />
      <PracticeSection />
      <CasesSection caseStudies={caseStudies} />
      <ConsultationSection />
    </main>
  );
}
