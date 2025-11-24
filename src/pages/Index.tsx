import { Header } from "@/components/Header";
import { HeroServices } from "@/components/HeroServices";
import { UniversCategories } from "@/components/UniversCategories";
import { PromotionsSection } from "@/components/PromotionsSection";
import { TrustSignals } from "@/components/TrustSignals";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroServices />
        <TrustSignals />
        <UniversCategories />
        <PromotionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
