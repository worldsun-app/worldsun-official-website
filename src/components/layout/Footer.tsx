import { Button } from "@/components/ui/button";

import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: "資產配置管理", href: "#services" },
      { name: "家族傳承規劃", href: "#services" },
      { name: "投資諮詢服務", href: "#services" },
      { name: "家族治理建議", href: "#services" }
    ],
    company: [
      { name: "關於我們", href: "#about" },
      { name: "投資洞察", href: "#insights" }
    ],
    legal: [
      { name: "隱私政策", href: "#" },
      { name: "服務條款", href: "#" },
      { name: "法律聲明", href: "#" },
      { name: "合規資訊", href: "#" }
    ]
  };

  return (
    <footer className="bg-foreground text-background relative">
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white shadow-luxury hover:shadow-elegant transition-smooth"
        size="icon"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">沃</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-playfair">沃勝家族辦公室</h3>
                <p className="text-sm text-background/70">跨世代財富傳承專家</p>
              </div>
            </div>
            
            <p className="text-background/80 leading-relaxed">
              沃勝家族辦公室致力於為高淨值家族提供專業的財富管理與傳承服務，
              結合投資專業與家族情懷，助您實現跨世代的財富永續與價值傳承。
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-background/80">
                <MapPin className="w-4 h-4 mr-3 text-accent" />
                台北市大安區敦化南路二段76號5樓之2
              </div>
              <div className="flex items-center text-background/80">
                <Phone className="w-4 h-4 mr-3 text-accent" />
                +886 2 7705-3298
              </div>
              <div className="flex items-center text-background/80">
                <Mail className="w-4 h-4 mr-3 text-accent" />
                service@wsgfo.com
              </div>
            </div>

          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">服務項目</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">公司資訊</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">法律資訊</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 沃勝家族辦公室. 版權所有. | 
            <a href="#privacy" className="hover:text-accent transition-smooth ml-1">隱私政策</a> | 
            <a href="#terms" className="hover:text-accent transition-smooth ml-1">服務條款</a>
          </p>
          <p className="text-background/50 text-xs mt-2">
            本網站所提供之資訊僅供參考，不構成投資建議。投資有風險，請謹慎評估。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;