import { useState, useEffect } from 'react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';

export function HeroCard() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isArtMode = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative sm:absolute right-0 sm:right-4 md:right-6 lg:right-8 bottom-0 sm:bottom-8 md:bottom-11 lg:bottom-13 flex flex-col items-end gap-2 sm:gap-3 md:gap-4 self-end">
      {/* Skill meters */}
      <div className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-500 ease-out sm:mr-8 md:mr-10 mr-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Frontend skill */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-1 sm:w-1.5 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
              <div className={`w-full h-[85%] rounded-full transition-colors duration-500 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-400'}`}></div>
            </div>
            <span className={`text-[6px] sm:text-[8px] transition-colors duration-500 ${isArtMode ? 'text-black/50' : 'text-white/50'}`}>FE</span>
          </div>
          
          {/* Backend skill */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-1 sm:w-1.5 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
              <div className={`w-full h-[75%] rounded-full transition-colors duration-500 ${isArtMode ? 'bg-black' : 'bg-white'}`}></div>
            </div>
            <span className={`text-[6px] sm:text-[8px] transition-colors duration-500 ${isArtMode ? 'text-black/50' : 'text-white/50'}`}>BE</span>
          </div>
          
          {/* Design skill */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-1 sm:w-1.5 h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
              <div className={`w-full h-[90%] rounded-full transition-colors duration-500 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-400'}`}></div>
            </div>
            <span className={`text-[6px] sm:text-[8px] transition-colors duration-500 ${isArtMode ? 'text-black/50' : 'text-white/50'}`}>UI</span>
          </div>
        </div>
        <span className={`text-[8px] sm:text-xs transition-colors duration-500 ${isArtMode ? 'text-black/70' : 'text-white/70'}`}>
          {isArtMode ? 'Digital artist' : 'Passionate developer'}
        </span>
      </div>

      {/* Professional card */}
      <div
        className={`relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl w-32 sm:w-60 md:w-64 lg:w-72 border border-white/20 bg-cover bg-center overflow-hidden transition-all duration-700 ease-out transform-gpu ${isVisible
          ? 'h-40 sm:h-72 md:h-80 lg:h-96 opacity-100 scale-y-100'
          : 'h-0 opacity-0 scale-y-0'
          }`}
        style={{
          backgroundImage: 'url(/assets/hero/HeroCard2.png)',
          transformOrigin: 'top'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
        <div className={`relative h-full p-3 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-500 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <p className="text-xs sm:text-base md:text-lg font-medium text-white leading-tight">
            Digital Art &<br />Web Dev
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <span className="text-[10px] sm:text-sm text-white/80">© 2025</span>
            <button className="text-[10px] sm:text-sm bg-white text-black px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:opacity-90 transition whitespace-nowrap">
              Let's talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
