import { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NomalHeroSection from "@/components/sections/NomalHeroSection";
import SEO from "@/components/SEO";

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection"));
const FeaturedInsights = lazy(() => import("@/components/sections/FeaturedInsights"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));

// Simple definition of Skeleton for sections to avoid importing heavy UI libs if not needed, 
// or use a simple div with min-height to prevent layout shift.
const SectionSkeleton = () => <div className="w-full h-[50vh] bg-background/5 animate-pulse" />;

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
        title="沃勝家族辦公室"
        name="跨世代財富傳承"
        description="沃勝家族辦公室 - 專業投資規劃與家族財富管理服務，助您實現財富增長與永續傳承。"
      />
      <Header />
      <main>
        {/* Keep Hero Section eager loaded for critical path */}
        <NomalHeroSection />

        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedInsights />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
