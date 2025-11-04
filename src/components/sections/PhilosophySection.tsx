const PhilosophySection = () => {
  return (
    <section className="section-spacing bg-gradient-subtle relative overflow-hidden">
      {/* Background Tree of Life Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
          <circle cx="400" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
          <circle cx="400" cy="300" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
        </svg>
      </div>

      <div className="container-elegant relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Section Label */}
          <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase">
            <div className="w-8 h-px bg-secondary" />
            <span>我們的信念</span>
            <div className="w-8 h-px bg-secondary" />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-foreground font-noto-serif leading-relaxed">
              我們相信，真正的財富，不僅是數字的積累，更是價值的延續。
            </p>
            
            <p className="text-xl md:text-2xl text-foreground-soft leading-relaxed">
              「利他」是沃勝的核心信念。我們從理解家族的初心出發，
              <br />
              將每一次的規劃，都視為一段關於責任、願景與關係的旅程。
            </p>

            {/* English Version */}
            <div className="pt-6 space-y-3 border-t border-border/30 mt-8">
              <p className="text-lg text-foreground-muted italic font-light">
                True wealth is not measured by numbers, but by the values we pass on.
              </p>
              <p className="text-base text-foreground-muted italic font-light">
                At Wosun, altruism is our compass — guiding families with empathy and purpose.
              </p>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="flex justify-center pt-8">
            <div className="w-1 h-16 bg-gradient-to-b from-secondary via-accent to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
