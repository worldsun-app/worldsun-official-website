import { Quote } from "lucide-react";
import { useState } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      chinese: "沃勝不只幫我們規劃財富，更幫我們定義了『未來』。",
      english: "They helped us see beyond wealth — into what our family truly stands for."
    },
    {
      chinese: "每一次對話，都像在與理解我們夢想的夥伴同行。",
      english: "Every conversation feels like walking alongside someone who understands our dreams."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-spacing bg-gradient-to-br from-secondary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 800 400">
          <defs>
            <pattern id="quotePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <text x="40" y="50" fontSize="40" fill="currentColor" className="text-secondary" opacity="0.3">"</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quotePattern)" />
        </svg>
      </div>

      <div className="container-elegant relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase mb-6">
            <div className="w-8 h-px bg-secondary" />
            <span>信任的聲音</span>
            <div className="w-8 h-px bg-secondary" />
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Display */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-12 md:p-16 shadow-luxury animate-fade-in">
              {/* Quote Icon */}
              <div className="w-16 h-16 mx-auto mb-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-secondary" />
              </div>

              {/* Testimonial Content */}
              <div className="text-center space-y-6">
                <p className="text-2xl md:text-3xl font-noto-serif text-foreground leading-relaxed">
                  {testimonials[activeIndex].chinese}
                </p>
                <p className="text-lg text-foreground-muted italic font-light">
                  {testimonials[activeIndex].english}
                </p>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index
                      ? 'bg-secondary w-8'
                      : 'bg-border hover:bg-secondary/50'
                  }`}
                  aria-label={`查看第 ${index + 1} 則見證`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
        <div className="absolute top-2/3 right-12 w-2 h-2 rounded-full bg-secondary animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
