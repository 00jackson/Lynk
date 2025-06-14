'use client';
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Animate the logo/icon
    controls.start({
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    });

    return () => clearInterval(interval);
  }, [controls]);

  if (progress >= 100) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm" 
         style={{ bottom: '20%' }}> {/* Fix for output panel visibility */}
      
      {/* Animated logo/icon with gradient border */}
      <motion.div
        animate={controls}
        className="relative p-1 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500 animate-spin-slow" />
        <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-12 h-12"
          >
            <motion.path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="url(#gradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Dynamic progress text */}
      <motion.p 
        className="mb-4 text-xl font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Math.round(progress)}%
      </motion.p>

      {/* Sophisticated progress bar */}
      <div className="w-64 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-violet-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", damping: 10 }}
        />
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-violet-400/40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}