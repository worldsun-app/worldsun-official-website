import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  const handleContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Floating Light Elements */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-10 animate-fade-in">
          {/* Section Label */}
          <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase">
            <div className="w-8 h-px bg-secondary" />
            <span>開啟對話</span>
            <div className="w-8 h-px bg-secondary" />
          </div>

          {/* Main Message */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-noto-serif text-foreground leading-tight">
              我們相信，傳承的起點，
              <br />
              <span className="text-secondary">是一場真誠的對話。</span>
            </h2>

            <p className="text-xl md:text-2xl text-foreground-soft leading-relaxed font-light">
              沃勝聯合家族辦公室，邀請您一起，
              <br />
              為下一代創造值得延續的故事。
            </p>

            {/* English Version */}
            <div className="pt-4 space-y-2 border-t border-border/30 mt-6">
              <p className="text-lg text-foreground-muted italic font-light">
                Every legacy begins with a meaningful conversation.
              </p>
              <p className="text-base text-foreground-muted italic font-light">
                Let's build yours — together.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg transition-smooth shadow-luxury group"
              onClick={handleContact}
            >
              與我們聯繫
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-foreground-muted mt-3 italic">Begin Your Legacy Conversation</p>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center space-x-4 pt-12">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-secondary to-accent" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-20 h-px bg-gradient-to-r from-accent via-secondary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
