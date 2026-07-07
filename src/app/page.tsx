import { ArticlesSection } from "@/components/home/ArticlesSection";
import { AttorneySection } from "@/components/home/AttorneySection";
import { CasesSection } from "@/components/home/CasesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PracticeSection } from "@/components/home/PracticeSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col bg-white text-zinc-950">
        <HeroSection />
        <AttorneySection />
        <PracticeSection />
        <CasesSection />
        <ArticlesSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
