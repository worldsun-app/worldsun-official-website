import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Heart, 
  Building, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight,
  Banknote,
  FileCheck
} from "lucide-react";

const ServicesSection = () => {
  const investmentServices = [
    {
      icon: PieChart,
      title: "資產配置",
      description: "不追求一時爆發，只求長久的穩健",
      features: ["全球配置", "風險控制", "績效追蹤"]
    },
    {
      icon: TrendingUp,
      title: "股權投資",
      description: "與時代的領跑者共同成長",
      features: ["盡職調查", "投後管理", "退出規劃"]
    },
    {
      icon: Building,
      title: "地產投資",
      description: "配置核心地段，留存永恆價值",
      features: ["核心地段", "商業地產", "REITs"]
    },
    {
      icon: Banknote,
      title: "另類投資",
      description: "在傳統之外，挖掘更多可能性",
      features: ["藝術收藏", "貴金屬", "結構商品"]
    }
  ];

  const heritageServices = [
    {
      icon: Heart,
      title: "治理規劃",
      description: "建立共識，讓家族精神有規可循",
      features: ["憲章制定", "架構設計", "決策機制"]
    },
    {
      icon: Shield,
      title: "財富傳承",
      description: "透過精準工具，確保財富平安交棒",
      features: ["信託設計", "保險規劃", "稅務優化"]
    },
    {
      icon: Users,
      title: "家族教育",
      description: "培育下一代，承擔榮耀與責任",
      features: ["財商教育", "接班培養", "活動規劃"]
    },
    {
      icon: FileCheck,
      title: "法律架構",
      description: "法律與規章，是家族最堅實的護盾",
      features: ["實體設立", "合規諮詢", "風險防護"]
    }
  ];

  const ServiceCard = ({ service, isHeritage = false }: { service: any, isHeritage?: boolean }) => (
    <Card className={`group h-full shadow-card hover:shadow-luxury transition-smooth hover:-translate-y-3 border-0 bg-card/60 backdrop-blur-sm ${
      isHeritage ? "hover:bg-primary/5" : "hover:bg-secondary/5"
    }`}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
            isHeritage ? "bg-primary text-white shadow-elegant" : "bg-secondary text-white shadow-elegant"
          }`}>
            <service.icon className="w-8 h-8" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-playfair">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {service.features.map((feature: string, index: number) => (
              <span 
                key={index} 
                className={`px-3 py-1 text-xs rounded-full border ${
                  isHeritage 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-secondary/5 border-secondary/20 text-secondary"
                }`}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="services" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-8 h-0.5 bg-secondary"></div>
            <span className="text-sm text-muted-foreground tracking-widest uppercase">Services</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold font-playfair mb-6 text-foreground">
            專業服務 / 投資管理
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            穿越週期的，穩健遠見
          </p>
        </div>

        {/* Investment Services */}
        <div className="mb-24">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-0.5 bg-secondary"></div>
              <h3 className="text-2xl font-bold font-playfair text-secondary tracking-wider">投資管理</h3>
              <div className="w-16 h-0.5 bg-secondary"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentServices.map((service, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Heritage Services */}
        <div>
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-0.5 bg-primary"></div>
              <h3 className="text-2xl font-bold font-playfair text-primary tracking-wider">家族傳承</h3>
              <div className="w-16 h-0.5 bg-primary"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heritageServices.map((service, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard service={service} isHeritage={true} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 shadow-luxury rounded-3xl p-12 max-w-xl mx-auto">
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
              <h4 className="text-2xl font-bold font-playfair mb-6 text-primary">
                專屬定制
              </h4>
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-elegant group"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                預約您的家族對話
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;