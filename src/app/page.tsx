import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/site/hero-section";
import { AboutSection } from "@/components/site/about-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { SecuritySection } from "@/components/site/security-section";
import { CtaSection } from "@/components/site/cta-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <SecuritySection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
