import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NomalHeroSection from "@/components/sections/NomalHeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import InsightsSection from "@/components/sections/InsightsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <NomalHeroSection />
        <AboutSection />
        <ServicesSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
