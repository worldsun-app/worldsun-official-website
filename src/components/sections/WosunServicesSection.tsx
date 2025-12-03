import { Sprout, Briefcase, Heart, Globe } from "lucide-react";

const WosunServicesSection = () => {
  const services = [
    {
      icon: Sprout,
      name: "家族治理",
      description: "凝聚家族共識，讓願景能世代共行。",
      english: "Strengthening unity — aligning family values across generations."
    },
    {
      icon: Briefcase,
      name: "資產策略",
      description: "讓財富與價值同向，實現長遠而穩健的布局。",
      english: "Aligning wealth with purpose for long-term resilience."
    },
    {
      icon: Heart,
      name: "傳承設計",
      description: "不止於文件，而是愛與信任的延續。",
      english: "Beyond paperwork — continuing love and shared meaning."
    },
    {
      icon: Globe,
      name: "國際規劃",
      description: "以全球視野，連結家族的每一個世代與市場。",
      english: "Connecting generations through global insight."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 text-secondary font-medium tracking-wider text-sm uppercase mb-6">
            <div className="w-8 h-px bg-secondary" />
            <span>我們的服務</span>
            <div className="w-8 h-px bg-secondary" />
          </div>
          <p className="text-2xl md:text-3xl font-noto-serif text-foreground leading-relaxed">
            每個家族的故事都不同，
            <br />
            而我們的角色，是理解、設計與同行。
          </p>
        </div>

        {/* Four Column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center shadow-card hover:shadow-elegant transition-smooth group hover:border-accent/30 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-noto-serif text-foreground group-hover:text-secondary transition-smooth">
                    {service.name}
                  </h3>
                  <p className="text-sm text-foreground-soft leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-foreground-muted italic font-light pt-2 border-t border-border/30">
                    {service.english}
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

export default WosunServicesSection;
