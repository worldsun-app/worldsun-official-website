import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ParallaxController } from "@/components/animation/ParallaxController";
import { motion, AnimatePresence, Transition } from "framer-motion";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Member from "./pages/Member";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import IndustryAnalysis from "./pages/IndustryAnalysis";
import IndustryReportPage from "./pages/IndustryReportPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CopyrightNotice from "./pages/CopyrightNotice";
import StrategyPage from "./pages/StrategyPage";

const queryClient = new QueryClient();

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-5vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "5vw",
  }
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Index />
          </motion.div>
        } />
        <Route path="/industry-analysis" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <IndustryAnalysis />
          </motion.div>
        } />
        <Route path="/industry-reports/:industryName" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <IndustryReportPage />
          </motion.div>
        } />
        {/* 新增策略頁面的路由 */}
        <Route path="/strategies/:strategyName" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <StrategyPage />
          </motion.div>
        } />
        <Route path="/privacy-policy" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <PrivacyPolicy />
          </motion.div>
        } />
        <Route path="/terms-of-service" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <TermsOfService />
          </motion.div>
        } />
        <Route path="/copyright-notice" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CopyrightNotice />
          </motion.div>
        } />
        <Route path="/strategies/:strategyName" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <StrategyPage />
          </motion.div>
        } />
        {/* Member functionality hidden */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // 背景動畫控制狀態
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // 檢查用戶偏好設定
  useEffect(() => {
    const savedPreference = localStorage.getItem('ws-animation-enabled');
    if (savedPreference !== null) {
      setAnimationEnabled(JSON.parse(savedPreference));
    }
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {/* 動畫背景層 - 獨立添加，不影響現有結構 */}
          <div className={`ws-animated-background ${animationEnabled ? 'ws-animation-enabled' : 'ws-animation-disabled'}`}></div>
          
          {/* 浮動幾何元素 - 第二階段 */}
          <div className={`ws-floating-geometry circle ${animationEnabled ? 'ws-animation-enabled' : 'ws-animation-disabled'}`}></div>
          <div className={`ws-floating-geometry triangle ${animationEnabled ? 'ws-animation-enabled' : 'ws-animation-disabled'}`}></div>
          <div className={`ws-floating-geometry square ${animationEnabled ? 'ws-animation-enabled' : 'ws-animation-disabled'}`}></div>
          <div className={`ws-floating-geometry hexagon ${animationEnabled ? 'ws-animation-enabled' : 'ws-animation-disabled'}`}></div>
          
          {/* 視差效果控制器 - 第三階段 */}
          <ParallaxController enabled={animationEnabled} />

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;