import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "首頁", href: "/" },
    { name: "關於我們", href: "/#about" },
    { name: "服務項目", href: "/#services" },
    { name: "產業週報", href: "/industry-analysis" },
    { name: "智慧洞察", href: "https://www.wsgfo.com", external: true },
    { name: "訂閱策略", href: "https://worldsun-investment-94f00565ff1b.herokuapp.com", external: true },
    { name: "合作夥伴", href: "https://wsappgd.zeabur.app/login", external: true },
    { name: "聯絡我們", href: "/#contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (external) {
      // 外部連結在新視窗開啟
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (href.startsWith('/#')) {
      // 如果是錨點連結
      const targetId = href.substring(2);
      
      if (location.pathname === '/') {
        // 如果已經在首頁，直接滾動到目標元素
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // 如果不在首頁，先導航到首頁，然後滾動到目標元素
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (href === '/') {
      // 如果是首頁連結
      if (location.pathname === '/') {
        // 如果已經在首頁，滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // 如果不在首頁，導航到首頁並滾動到頂部
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // 普通頁面路由
      navigate(href);
      // 導航到新頁面後滾動到頂部
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg shadow-card" 
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-playfair">沃</span>
            </div>
            <div>
              <h1 className={`text-xl font-bold font-playfair ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                沃勝家族辦公室
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-white/70'}`}>跨世代財富傳承</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'} transition-smooth relative group whitespace-nowrap`}
                onClick={(e) => handleNavClick(e, item.href, item.external)}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button Only */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-primary text-white hover:bg-primary/90 border-0 hover:shadow-elegant transition-smooth"
              onClick={() => {
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
              }}
            >
              預約諮詢
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={(e) => handleNavClick(e, item.href, item.external)}
                >
                  {item.name}
                </a>
              ))}
              {/* No auth buttons in mobile - only consultation */}
              <Button 
                variant="default" 
                className="bg-primary text-white hover:bg-primary/90 border-0 mt-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
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
                }}
              >
                預約諮詢
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;