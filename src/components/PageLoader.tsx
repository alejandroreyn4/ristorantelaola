import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onLoadingComplete}>
      {progress < 100 ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-100"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Percentage */}
          <motion.div 
            className="font-serif text-7xl md:text-9xl text-[#041A25] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {progress}%
          </motion.div>

          {/* Wave Progress Bar */}
          <div className="relative w-64 h-16 overflow-hidden">
            {/* Background Wave (Track) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
              <path
                d="M0 20 C 50 0, 150 40, 200 20 L 200 40 L 0 40 Z"
                fill="#e5e7eb"
              />
            </svg>

            {/* Foreground Wave (Fill) */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ x: '-100%' }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ ease: 'linear' }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M0 20 C 50 0, 150 40, 200 20 L 200 40 L 0 40 Z"
                  fill="#000084"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PageLoader;
