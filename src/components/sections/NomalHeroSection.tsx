import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import assets
import videoSrc from "@/assets/taipei101.mp4";
import imgMorning from "@/assets/taipei-101-early morning.png";
import imgMoon from "@/assets/taipei-101-moon.jpg";
import imgNight from "@/assets/taipei-101-night.png";

const images = [imgMorning, imgMoon, imgNight];

const NomalHeroSection = () => {
  const [videoHasEnded, setVideoHasEnded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleVideoEnd = () => {
    setVideoHasEnded(true);
  };

  const startAutoplay = () => {
    // Clear existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 3 seconds
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (videoHasEnded) {
      startAutoplay();
    }
    // Cleanup interval on component unmount
    return () => stopAutoplay();
  }, [videoHasEnded]);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full">
        {!videoHasEnded ? (
          <motion.video
            key="video"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <source src={videoSrc} type="video/mp4" />
          </motion.video>
        ) : (
          /* Static Image Stack with Opacity Transition */
          <div className="absolute inset-0 w-full h-full">
            {images.map((img, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${img})` }}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 pb-32 md:pb-24">
          <div className="max-w-4xl">
            <div>
              <p className="text-base md:text-2xl text-white/90 font-light tracking-widest mb-4 md:mb-6">
                Wealth Beyond Generations.
              </p>
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight leading-[0.85] font-playfair">
                  永續
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-primary tracking-tight leading-[0.85] font-playfair ml-8 md:ml-16">
                  傳承
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Markers */}
      <div className="absolute bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 md:space-x-6 text-white/70 text-xs md:text-sm font-light tracking-wider whitespace-nowrap">
          <span>台北</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>香港</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>新加坡</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>美國</span>
        </div>
      </div>

      {/* Slideshow Pagination Dots */}
      {
        videoHasEnded && (
          <div
            className="absolute bottom-16 right-8 z-20 flex flex-col space-y-2"
            onMouseLeave={startAutoplay} // Resume autoplay when mouse leaves the container
          >
            {images.map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: currentImageIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  transform: currentImageIndex === index ? 'scale(1.2)' : 'scale(1)',
                }}
                onMouseEnter={() => {
                  stopAutoplay();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )
      }
    </section >
  );
};

export default NomalHeroSection;
