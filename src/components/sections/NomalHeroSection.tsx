import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Building2, Award } from "lucide-react";
import taipei101Night from "@/assets/taipei-101-night.jpg";

const NomalHeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: TrendingUp, value: "20+", label: "年專業經驗" },
    { icon: Users, value: "100+", label: "服務家族" },
    { icon: Building2, value: "500億+", label: "資產管理規模" },
    { icon: Award, value: "15+", label: "專業認證" },
  ];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* 台北101夜景背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${taipei101Night})` }}
      />
      
      {/* 深色遮罩增強文字可讀性 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* 主要內容區域 */}
      <div className="relative z-10 w-full">
        {/* 主要內容 - 左下角位置 */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="max-w-4xl">
            {/* 標題區塊 - 英文和中文放在一起 */}
            <div>
              {/* 英文標語 */}
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest mb-6">
                Wealth Beyond Generations.
              </p>
              
              {/* 主標題 - 斷行設計 */}
              <div className="space-y-2">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight leading-[0.85] font-playfair">
                  永續
                </h1>
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-primary tracking-tight leading-[0.85] font-playfair ml-8 md:ml-16">
                  傳承
                </h1>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* 地理標記 - 底部中央 */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-6 text-white/70 text-sm font-light tracking-wider">
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">台北</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">香港</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">新加坡</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">美國</span>
        </div>
      </div>
      
    </section>
  );
};

export default NomalHeroSection;