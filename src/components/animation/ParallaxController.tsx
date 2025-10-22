import { useEffect, useState } from 'react';

interface ParallaxControllerProps {
  enabled: boolean;
}

export const ParallaxController = ({ enabled }: ParallaxControllerProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    // 滑鼠移動事件處理
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });

      // 更新CSS變數供滑鼠追隨動畫使用
      document.documentElement.style.setProperty('--mouse-x', `${x * 0.5}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y * 0.5}px`);
    };

    // 滾動視差效果
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.ws-scroll-parallax');
      
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.speed || '0.5');
        const yPos = scrolled * speed;
        htmlElement.style.transform = `translateY(${yPos}px)`;
      });

      // 浮動幾何元素的滾動反應
      const geometryElements = document.querySelectorAll('.ws-floating-geometry');
      geometryElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const speed = 0.1 + (index * 0.05);
        const yPos = scrolled * speed * -1;
        const currentTransform = htmlElement.style.transform || '';
        
        // 保持原有的動畫transform，只添加滾動偏移
        if (!currentTransform.includes('translateY')) {
          htmlElement.style.transform = `${currentTransform} translateY(${yPos}px)`;
        }
      });
    };

    // 添加事件監聽器
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始化滾動位置
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  // 添加視差粒子
  useEffect(() => {
    if (!enabled) return;

    const container = document.body;
    const particles: HTMLElement[] = [];

    // 創建5個粒子
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'ws-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${-i * 2}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [enabled]);

  return null; // 這是一個邏輯組件，不渲染任何內容
};