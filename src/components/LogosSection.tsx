import { motion } from 'framer-motion';

export function LogosSection() {
  const logos = [
    { name: 'React', src: '/hero/otherLogos/react.png' },
    { name: 'Vue', src: '/hero/otherLogos/vue.png' },
    { name: 'Laravel', src: '/hero/otherLogos/laravel.png' },
    { name: 'Python', src: '/hero/otherLogos/python.png' },
    { name: 'Astro', src: '/hero/otherLogos/astro.png' },
    { name: 'CSS', src: '/hero/otherLogos/css.png' },
    { name: 'Git', src: '/hero/otherLogos/git.png' },
    { name: 'HTML', src: '/hero/otherLogos/HTML.png' },
    { name: 'Tailwind', src: '/hero/otherLogos/Tailwind.png' },
    { name: 'Clip Studio', src: '/hero/otherLogos/clipstudio.png' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8"
    >
      {/* Logos Container */}
      <div className="relative overflow-hidden flex-1">
        <motion.div
          animate={{ x: -1000 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
          className="flex items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-max"
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-1`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
              className={`flex-shrink-0 ${logo.name === 'Clip Studio' ? 'relative' : ''}`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300 ${
                  logo.name === 'Tailwind' ? 'h-32 w-32 dark:invert dark:brightness-200' : logo.name === 'Astro' ? 'h-24 w-24 dark:invert dark:brightness-200' : 'h-12 w-12'
                }`}
              />
              {logo.name === 'Clip Studio' && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent 0%, var(--background) 70%)' }}></div>
              )}
            </motion.div>
          ))}
          
          {/* Duplicate logos for seamless loop */}
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-2`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
              className={`flex-shrink-0 ${logo.name === 'Clip Studio' ? 'relative' : ''}`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300 ${
                  logo.name === 'Tailwind' ? 'h-32 w-32 dark:invert dark:brightness-200' : logo.name === 'Astro' ? 'h-24 w-24 dark:invert dark:brightness-200' : 'h-12 w-12'
                }`}
              />
              {logo.name === 'Clip Studio' && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent 0%, var(--background) 70%)' }}></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text - Side by side with logos */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-left flex-shrink-0"
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-black dark:text-white">●</span>
            ))}
          </div>
          <span className="font-medium">4.9/5</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500 mt-1">
          Trusted by <span className="font-medium text-neutral-700 dark:text-neutral-300">100+</span> businesses
        </p>
      </motion.div>
    </motion.div>
  );
}