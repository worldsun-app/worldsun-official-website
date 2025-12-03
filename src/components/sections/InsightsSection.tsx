import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight } from "lucide-react";

const InsightsSection = () => {
  const navigate = useNavigate();

  const handleNavigate1 = () => {
    navigate('/industry-analysis');
  };
  const handleNavigate2 = () => {
    window.open('https://www.wsgfo.com/', '_blank');
  };

  return (
    <section id="insights" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-8 h-0.5 bg-secondary"></div>
            <span className="text-sm text-muted-foreground tracking-widest uppercase">Market Analysis</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold font-playfair mb-6 text-foreground">
            產業智慧洞察
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            基於量化數據與市場趨勢的專業分析
          </p>
        </div>

        {/* Gateway Button */}
        <div className="text-center animate-scale-in">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 shadow-luxury rounded-2xl p-8">
              <h3 className="text-xl font-bold font-playfair mb-4 text-primary">
                掌握世界趨勢
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                剖析市場數據，掌握財富策略。
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-elegant group"
                onClick={handleNavigate2}
              >
                進入智慧洞察
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 shadow-luxury rounded-2xl p-8">
              <h3 className="text-xl font-bold font-playfair mb-4 text-primary">
                探索市場動態
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                深入了解各產業的詳細數據、報酬率與市場廣度指標。
              </p>
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-elegant group"
                onClick={handleNavigate1}
              >
                進入產業分析
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;