import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";

// Type Definitions
interface SubItem {
  name: string;
  href: string;
  description?: string;
  external?: boolean;
}
interface NavLink {
  name: string;
  href: string;
  external?: boolean;
  isDropdown?: false;
}
interface NavDropdown {
  name: string;
  isDropdown: true;
  subItems: SubItem[];
  href?: undefined;
  external?: undefined;
}
type NavItem = NavLink | NavDropdown;

// ListItem Component for Dropdown
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/90 hover:text-white focus:bg-primary/90 focus:text-white ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover:text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-white/90">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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

  const navItems: NavItem[] = [
    { name: "首頁", href: "/" },
    { name: "關於我們", href: "/#about" },
    { name: "服務項目", href: "/#services" },
    { name: "產業週報", href: "/industry-analysis" },
    {
      name: "訂閱策略",
      isDropdown: true,
      subItems: [
        { name: "All Weather", href: "/strategies/All-Weather", description: "穩健應對多變市場的全天候策略。" },
        { name: "SMART 500", href: "/strategies/SMART-500", description: "基於 S&P 500 的智慧型投資組合。" },
      ],
    },
    { name: "智慧洞察", href: "https://www.wsgfo.com", external: true },
    { name: "合作夥伴", href: "https://wsappgd.zeabur.app/login", external: true },
    { name: "聯絡我們", href: "/#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string, external?: boolean) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (location.pathname === '/') {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: targetId } });
      }
    } else {
      navigate(href);
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
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-playfair">沃</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold font-playfair ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                  沃勝家族辦公室
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-white/70'}`}>跨世代財富傳承</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.isDropdown ? (
                <NavigationMenu key={item.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-foreground hover:text-white hover:bg-primary/90' : 'text-white hover:bg-primary/90'} bg-transparent focus:bg-transparent data-[state=open]:bg-primary/90 data-[state=open]:text-white`}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-background/95 backdrop-blur-lg shadow-card">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.subItems?.map((subItem) => (
                            <ListItem
                              key={subItem.name}
                              title={subItem.name}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href, subItem.external)}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.external)}
                  className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'} bg-transparent hover:bg-transparent focus:bg-transparent whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Button Only */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-primary text-white hover:bg-primary/90 border-0 hover:shadow-elegant transition-smooth"
              onClick={(e) => handleNavClick(e, '/#contact')}
            >
              預約諮詢
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white'} hover:bg-primary/90 hover:text-white rounded-full`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {/* Mobile Menu Card */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`absolute top-full right-0 mt-2 w-72 lg:hidden rounded-xl border ${(!isScrolled && location.pathname === '/') ? 'bg-black/50 border-white/20' : 'bg-background/95 border-border'} backdrop-blur-lg shadow-xl`}
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.flatMap((item) => 
                  item.isDropdown && item.subItems 
                  ? [
                      <span key={`${item.name}-title`} className={`${(!isScrolled && location.pathname === '/') ? 'text-white/70' : 'text-muted-foreground'} font-semibold px-2 pt-2 text-sm`}>{item.name}</span>,
                      ...item.subItems.map(subItem => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`${(!isScrolled && location.pathname === '/') ? 'text-white/90' : 'text-foreground'} hover:bg-primary/90 hover:text-white rounded-md transition-colors py-2 px-3 text-sm`}
                          onClick={(e) => handleNavClick(e, subItem.href, subItem.external)}
                        >
                          {subItem.name}
                        </Link>
                      ))
                    ]
                  : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${(!isScrolled && location.pathname === '/') ? 'text-white/90' : 'text-foreground'} hover:bg-primary/90 hover:text-white rounded-md transition-colors py-2 px-3 text-sm`}
                      onClick={(e) => handleNavClick(e, item.href, item.external)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
                <div className="border-t w-full my-2" style={{ borderColor: (!isScrolled && location.pathname === '/') ? 'rgba(255,255,255,0.2)' : 'hsl(var(--border))' }}></div>
                <Button 
                  variant="default" 
                  className="bg-primary text-white hover:bg-primary/90 border-0 w-full mt-2"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                >
                  預約諮詢
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;