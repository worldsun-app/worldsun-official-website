import React, { useEffect, useRef } from 'react';

interface GhostNewsletterSubscriptionProps {
  className?: string;
  description?: string;
}

const GhostNewsletterSubscription = ({
  className = "",
  description
}: GhostNewsletterSubscriptionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 創建 script 元素
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
      script.setAttribute('data-title', '智慧洞察電子報');
      script.setAttribute('data-button-color', '#00585C');
      script.setAttribute('data-button-text-color', '#FFFFFF');
      script.setAttribute('data-site', 'https://www.wsgfo.com/');
      script.setAttribute('data-locale', 'en');
      script.async = true;
      
      // 將 script 添加到容器
      containerRef.current.appendChild(script);
      
      // 添加 CSS 來美化表單
      const style = document.createElement('style');
      style.textContent = `
        .newsletter-form iframe {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className={className}>
      <div className="p-6">
        <div 
          ref={containerRef}
          className="newsletter-form"
          style={{ 
            minHeight: "58px", 
            maxWidth: "440px", 
            margin: "0 auto", 
            width: "100%" 
          }}
        />
      </div>
    </div>
  );
};

export default GhostNewsletterSubscription;