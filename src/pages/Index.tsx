import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NomalHeroSection from "@/components/sections/NomalHeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
// import InsightsSection from "@/components/sections/InsightsSection";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
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
        <NomalHeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedInsights />
        {/* <InsightsSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
