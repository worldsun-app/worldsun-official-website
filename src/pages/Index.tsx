import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NomalHeroSection from "@/components/sections/NomalHeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedInsights from "@/components/sections/FeaturedInsights";
import ContactSection from "@/components/sections/ContactSection";
import SEO from "@/components/SEO";

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
      <SEO
        title="首頁"
        description="World Sun Global Family Office - 您的全球資產配置專家，提供專業的投資策略與產業分析報告。"
      />
      <Header />
      <main>
        <NomalHeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedInsights />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
