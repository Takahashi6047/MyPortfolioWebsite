import { motion } from 'framer-motion';

export interface LogosSectionProps {
  isLoadingComplete?: boolean;
}

export function LogosSection({ isLoadingComplete = false }: LogosSectionProps) {
  const logos = [
    { name: 'React', src: '/assets/hero/otherLogos/react.png' },
    { name: 'Vue', src: '/assets/hero/otherLogos/vue.png' },
    { name: 'Laravel', src: '/assets/hero/otherLogos/laravel.png' },
    { name: 'Python', src: '/assets/hero/otherLogos/python.png' },
    { name: 'Astro', src: '/assets/hero/otherLogos/astro.png' },
    { name: 'CSS', src: '/assets/hero/otherLogos/css.png' },
    { name: 'Git', src: '/assets/hero/otherLogos/git.png' },
    { name: 'HTML', src: '/assets/hero/otherLogos/HTML.png' },
    { name: 'Tailwind', src: '/assets/hero/otherLogos/Tailwind.png' },
    { name: 'Clip Studio', src: '/assets/hero/otherLogos/clipstudio.png' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isLoadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: isLoadingComplete ? 2.2 : 0, duration: 0.6 }}
      className="relative flex flex-row items-center gap-4 sm:gap-6 md:gap-8"
    >
      <div className="relative overflow-hidden flex-1 min-w-0">
        <motion.div
          animate={{
            x: [0, -50]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
          className="flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-16 w-max"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-1`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoadingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: isLoadingComplete ? 2.4 + index * 0.05 : 0, duration: 0.4 }}
              className="flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 ${logo.name === 'Tailwind' ? 'h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 dark:invert dark:brightness-200' : logo.name === 'Astro' ? 'h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 dark:invert dark:brightness-200' : 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12'
                  }`}
              />
            </motion.div>
          ))}

          {logos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-2`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoadingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: isLoadingComplete ? 2.4 + index * 0.05 : 0, duration: 0.4 }}
              className="flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 ${logo.name === 'Tailwind' ? 'h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 dark:invert dark:brightness-200' : logo.name === 'Astro' ? 'h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 dark:invert dark:brightness-200' : 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12'
                  }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: isLoadingComplete ? 2.6 : 0, duration: 0.6 }}
        className="text-right flex-shrink-0"
      >
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm">★</span>
            ))}
            <div className="relative inline-block text-xs sm:text-sm">
              <span className="text-neutral-300 dark:text-neutral-600">★</span>
              <div className="absolute inset-0 overflow-hidden" style={{ width: '90%' }}>
                <span className="text-neutral-400 dark:text-neutral-500">★</span>
              </div>
            </div>
          </div>
          <span className="font-medium">4.9/5</span>
        </div>
        <div className="relative mt-2">
          <div className="text-xs sm:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 whitespace-nowrap tracking-wide font-light">
            <span className="relative inline-block">
              <span className="font-semibold bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent">
                Fresh
              </span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-500 to-transparent opacity-40"></span>
            </span>{' '}
            <span className="text-neutral-700 dark:text-neutral-300 font-medium tracking-wider">
              ideas, proven skills
            </span>
          </div>
          <span className="absolute -top-1 -left-2 w-1 h-1 bg-gradient-to-br from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-300 rounded-full opacity-60 animate-pulse"></span>
        </div>
      </motion.div>
    </motion.div>
  );
}
