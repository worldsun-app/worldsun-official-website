import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Shield, Award } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { icon: TrendingUp, value: "30+", label: "億元管理資產" },
    { icon: Users, value: "20+", label: "服務家族" },
    { icon: Shield, value: "15+", label: "年經驗累積" },
    { icon: Award, value: "98%", label: "客戶滿意度" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden ws-parallax-container">
      {/* Warm Background with Family Elements */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-muted/20"></div>
        
        {/* Family Tree Inspired Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="familyPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="2" fill="currentColor" className="text-primary">
                  <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="150" r="1.5" fill="currentColor" className="text-accent">
                  <animate attributeName="r" values="1.5;3;1.5" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="150" r="1.5" fill="currentColor" className="text-primary">
                  <animate attributeName="r" values="1.5;3;1.5" dur="6s" repeatCount="indefinite" />
                </circle>
                <line x1="100" y1="100" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                <line x1="100" y1="100" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#familyPattern)" />
          </svg>
        </div>
      </div>
      
      {/* Warm Floating Elements with Family Symbols - 添加視差效果 */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/15 rounded-full blur-xl animate-float flex items-center justify-center ws-parallax-slow ws-mouse-follow-slow">
        <div className="w-8 h-8 opacity-20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.99 2.99 0 0 0 17.04 6H6.96c-1.3 0-2.42.84-2.82 2.06L1.5 16H4v6h2v-6h2.5v6h2v-6H12v6h2v-6h2.5v6h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
          </svg>
        </div>
      </div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float flex items-center justify-center ws-parallax-medium ws-mouse-follow-medium" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 opacity-25">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/12 rounded-full blur-2xl animate-float flex items-center justify-center ws-parallax-fast ws-mouse-follow-fast" style={{ animationDelay: '2s' }}>
        <div className="w-10 h-10 opacity-15">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      
      {/* Additional Warm Elements - 添加滾動視差 */}
      <div className="absolute top-16 right-16 w-32 h-32 bg-accent/8 rounded-full blur-3xl animate-pulse ws-scroll-parallax" data-speed="0.3"></div>
      <div className="absolute bottom-16 left-16 w-40 h-40 bg-primary/6 rounded-full blur-3xl animate-pulse ws-scroll-parallax" data-speed="0.2" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
                <Award className="w-4 h-4 mr-2" />
                專業家族辦公室
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground">
                家族
                <span className="block text-primary">
                  永續傳承
                </span>
              </h1>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="w-12 h-0.5 bg-secondary"></div>
                <span className="text-lg font-medium tracking-wider">世代 · 智慧 · 傳承</span>
                <div className="w-12 h-0.5 bg-primary"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 transition-smooth shadow-elegant group"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                立即諮詢
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 text-primary hover:bg-primary hover:text-white transition-smooth"
              >
                了解更多
              </Button>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-card hover:shadow-elegant transition-smooth group hover:border-primary/30 hover:bg-card animate-scale-in ws-micro-hover"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-3xl font-bold font-playfair text-foreground mb-1 group-hover:text-primary transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Background Decorations */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default HeroSection;