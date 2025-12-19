import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, Globe, Heart, CheckCircle, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AboutSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const values = [
    {
      icon: Heart,
      title: "傳承使命",
      description: "讓家族精神，世代如初"
    },
    {
      icon: Trophy,
      title: "專業卓越",
      description: "以專業，換您的安心託付"
    },
    {
      icon: Globe,
      title: "國際視野",
      description: "立足本土，佈局全球"
    }
  ];

  const achievements = [
    { number: "30+", label: "億元管理資產", icon: TrendingUp },
    { number: "20+", label: "服務家族", icon: Users },
    { number: "15+", label: "年專業經驗", icon: Trophy },
    { number: "98%", label: "客戶滿意度", icon: CheckCircle }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-muted/30"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            關於沃勝
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-foreground mb-6">
            我們不只是您的財務顧問
            <span className="block text-primary">更是家族的守門人</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            沃勝家族辦公室成立於2016年，專注為高淨值家族提供全方位的財富管理與傳承服務
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            我們深信，真正的財富不僅是金錢，更是世代相傳的價值觀與智慧
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-3xl font-bold font-playfair text-foreground mb-4">
                我們的使命
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">懂您所想</h4>
                    <p className="text-muted-foreground">每一個家族都是獨一無二的，方案為您們量身打造</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">並肩同行</h4>
                    <p className="text-muted-foreground">我們不看短期利益，只看您的家族十年、五十年後的樣子</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">智囊守護</h4>
                    <p className="text-muted-foreground"> 集結法律、財務、稅務專家，做您最強大的後援</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="text-center group">
                        <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-3xl font-bold font-playfair text-foreground group-hover:text-primary transition-colors">
                          {achievement.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center animate-fade-in">
            <h3 className="text-3xl lg:text-4xl font-bold font-playfair text-foreground mb-4">
              核心價值 守護家族的長青精神
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我們的核心價值指引著每一項服務...
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我們深知每一份財富背後，都是一代人的奮鬥與對家人的愛
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card hover:shadow-elegant transition-smooth group hover:border-primary/30"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-xl font-bold font-playfair text-foreground mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-primary/5 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold font-playfair text-foreground mb-4">
              開始您的財富傳承之旅
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              讓我們的專業團隊為您量身打造專屬的家族財富管理方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 transition-smooth shadow-elegant"
                onClick={handleConsultationClick}
              >
                預約諮詢
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;