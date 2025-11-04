import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WosunHeroSection from "@/components/sections/WosunHeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PurposeSection from "@/components/sections/PurposeSection";
import WosunServicesSection from "@/components/sections/WosunServicesSection";
import StorySection from "@/components/sections/StorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <WosunHeroSection />
        <PhilosophySection />
        <PurposeSection />
        <WosunServicesSection />
        <StorySection />
        <TestimonialsSection />
        <FinalCTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
