import { Leaf, Bird, Handshake } from "lucide-react";

const PurposeSection = () => {
  const purposes = [
    {
      icon: Leaf,
      title: "利他為本，共創價值",
      description: "每一個決策的起點，不是個人利益，而是共榮的終點。",
      english: "Altruism first — we design strategies where shared prosperity defines success."
    },
    {
      icon: Bird,
      title: "長遠傳承，代代相續",
      description: "我們不只守護資產，更守護家族的信念與文化。",
      english: "Legacy that lasts — protecting not just wealth, but the principles that define generations."
    },
    {
      icon: Handshake,
      title: "專業守護，信任為基",
      description: "我們的每一份建議，都是以真誠與責任為出發點。",
      english: "Expertise anchored in trust — every decision grounded in integrity and care."
    }
  ];

  return (
    <section className="section-spacing bg-background relative">
      <div className="container-elegant">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase mb-6">
            <div className="w-8 h-px bg-secondary" />
            <span>我們的使命</span>
            <div className="w-8 h-px bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-noto-serif text-foreground">
            核心價值
          </h2>
        </div>

        {/* Three Column Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon;
            return (
              <div
                key={index}
                className="card-elegant group hover:border-secondary/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-smooth">
                  <Icon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-noto-serif text-foreground group-hover:text-secondary transition-smooth">
                    {purpose.title}
                  </h3>
                  <p className="text-foreground-soft leading-relaxed">
                    {purpose.description}
                  </p>
                  <p className="text-sm text-foreground-muted italic font-light pt-2 border-t border-border/30">
                    {purpose.english}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
