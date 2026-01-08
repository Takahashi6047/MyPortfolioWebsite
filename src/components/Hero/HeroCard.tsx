import { useState, useEffect } from 'react';

export function HeroCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative sm:absolute right-0 sm:right-4 md:right-6 lg:right-8 bottom-0 sm:bottom-8 md:bottom-11 lg:bottom-13 flex flex-col items-end gap-2 sm:gap-3 md:gap-4 self-end">
      {/* Happy clients badge */}
      <div className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
        <div className="flex -space-x-1.5 sm:-space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-400 border-2 border-card"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-500 border-2 border-card"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-600 border-2 border-card"></div>
        </div>
        <span className="text-[10px] sm:text-xs text-white/70 hidden sm:inline">Happy clients worldwide</span>
      </div>

      {/* Professional card */}
      <div
        className={`relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl w-52 sm:w-60 md:w-64 lg:w-72 border border-white/20 bg-cover bg-center overflow-hidden transition-all duration-700 ease-out transform-gpu ${isVisible
            ? 'h-64 sm:h-72 md:h-80 lg:h-96 opacity-100 scale-y-100'
            : 'h-0 opacity-0 scale-y-0'
          }`}
        style={{
          backgroundImage: 'url(/hero/HeroCard2.png)',
          transformOrigin: 'top'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
        <div className={`relative h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-500 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <p className="text-sm sm:text-base md:text-lg font-medium text-white">
            Digital Art &<br />Web Development
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-white/80">© 2025</span>
            <button className="text-xs sm:text-sm bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:opacity-90 transition">
              Let's talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
