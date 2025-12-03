import { Layers } from "lucide-react";

const StorySection = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-1 h-64 bg-gradient-to-b from-transparent via-accent to-transparent" />
      <div className="absolute top-1/2 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-secondary to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase">
              <div className="w-8 h-px bg-secondary" />
              <span>我們的故事</span>
            </div>

            <div className="space-y-5">
              <p className="text-2xl md:text-3xl font-noto-serif text-foreground leading-relaxed">
                沃勝誕生於一個簡單卻深刻的信念：
                <br />
                <span className="text-secondary">財富的最終意義，是讓他人也能成長與安穩。</span>
              </p>

              <p className="text-lg text-foreground-soft leading-relaxed">
                我們的團隊結合財稅、法律、信託與國際規劃等專業，
                用「利他」為核心，用「陪伴」為方式，
                一步步實現家族、企業與社會的共好。
              </p>

              <div className="pt-4 space-y-2 border-t border-border/30">
                <p className="text-base text-foreground-muted italic font-light">
                  Founded on the belief that wealth finds its meaning when it uplifts others.
                </p>
                <p className="text-sm text-foreground-muted italic font-light">
                  Our team turns altruism into lasting legacy — with expertise and empathy.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/5 p-8 flex items-center justify-center">
              <div className="text-center space-y-6">
                {/* Decorative Icon */}
                <div className="w-24 h-24 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                  <Layers className="w-12 h-12 text-secondary" />
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <p className="text-3xl font-noto-serif text-secondary">利他</p>
                  <p className="text-xl font-noto-serif text-foreground">為核心信念</p>
                  <div className="w-16 h-px bg-accent mx-auto" />
                  <p className="text-sm text-foreground-muted italic">
                    Altruism as Foundation
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
