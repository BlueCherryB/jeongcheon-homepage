import { AttorneySection } from "@/components/home/AttorneySection";
import { CasesSection } from "@/components/home/CasesSection";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PracticeSection } from "@/components/home/PracticeSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white text-zinc-950">
      <HeroSection />
      <AttorneySection />
      <PracticeSection />
      <CasesSection />
      <ConsultationSection />
    </main>
  );
}
