import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ParallaxController } from "@/components/animation/ParallaxController";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Member from "./pages/Member";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          
          {/* 動畫控制 Toggle Switch - 右下角 */}
          <div className="fixed bottom-6 right-6 z-[9999]">
            <Switch
              checked={animationEnabled}
              onCheckedChange={(checked) => {
                setAnimationEnabled(checked);
                localStorage.setItem('ws-animation-enabled', JSON.stringify(checked));
              }}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {/* 視差效果控制器 - 第三階段 */}
          <ParallaxController enabled={animationEnabled} />

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Member functionality hidden */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
