import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '@/assets/logo.png';

import {
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1); // remove '#'

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  const footerLinks = {
    services: [
      { name: "資產配置管理", href: "#services" },
      { name: "家族傳承規劃", href: "#services" },
    ],
    company: [
      { name: "關於我們", href: "#about" },
      { name: "精選洞察", href: "#featured-insights" }
    ],
    legal: [
      { name: "隱私政策", href: "/privacy-policy" },
      { name: "服務條款", href: "/terms-of-service" },
      { name: "著作權聲明", href: "/copyright-notice" },
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
              <img src={logo} alt="沃勝家族辦公室 Logo" className="w-16 h-15" />
              <div>
                <h3 className="text-xl font-bold font-playfair">沃勝家族辦公室</h3>
                <p className="text-sm text-background/70">跨世代財富傳承</p>
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
              <a href="tel:+886277053298" target="_blank" rel="noopener noreferrer" className="flex items-center text-background/80 hover:text-accent transition-smooth">
                <Phone className="w-4 h-4 mr-3 text-accent" />
                +886 2 7705-3298
              </a>
              {/* Mobile Email Link - Mailto */}
              <a href="mailto:service@wsgfo.com" target="_blank" rel="noopener noreferrer" className="flex md:hidden items-center text-background/80 hover:text-accent transition-smooth">
                <Mail className="w-4 h-4 mr-3 text-accent" />
                service@wsgfo.com
              </a>
              {/* Desktop Email Link - Gmail Web */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=service@wsgfo.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center text-background/80 hover:text-accent transition-smooth">
                <Mail className="w-4 h-4 mr-3 text-accent" />
                service@wsgfo.com
              </a>
            </div>

          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">服務項目</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-accent transition-smooth hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 沃勝家族辦公室. 版權所有.
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