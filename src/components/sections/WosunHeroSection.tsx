import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WosunHeroSection = () => {
  const handleContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background-soft to-background-muted">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--secondary)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Warm Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-noto-serif text-foreground leading-tight tracking-wide">
              當利他成為習慣，
              <br />
              <span className="text-secondary">傳承自然延續。</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-foreground-soft font-light max-w-3xl mx-auto leading-relaxed">
              沃勝聯合家族辦公室，陪伴您在財富與意義之間，找到永續的平衡。
            </p>

            {/* English Version */}
            <div className="pt-4 space-y-2">
              <p className="text-sm md:text-base lg:text-lg text-foreground-muted italic font-light">
                When altruism becomes a way of life, legacy flows naturally.
              </p>
              <p className="text-xs md:text-sm lg:text-base text-foreground-muted italic font-light">
                Guiding families toward harmony between wealth, purpose, and generations.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg transition-smooth shadow-elegant group"
              onClick={handleContact}
            >
              與我們展開對話
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-foreground-muted mt-3 italic">Start the Conversation</p>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center space-x-4 pt-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default WosunHeroSection;
