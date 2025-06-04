'use client';
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Advanced gradient animation with color morphing
  const gradientBackground = useMotionTemplate`radial-gradient(at ${mouseX}px ${mouseY}px, var(--color-1) 0%, var(--color-2) 30%, var(--color-3) 60%, transparent 80%)`;
  
  // 3D floating cards state
  const [floatingCards, setFloatingCards] = useState([
    { id: 1, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 1 },
    { id: 2, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 2 },
    { id: 3, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 3 }
  ]);

  // Initialize component
  useEffect(() => {
    setIsMounted(true);
    randomizeFloatingCards();
  }, []);

  // Dynamic color animation
  useEffect(() => {
    if (!isInView) return;
    
    const colors = [
      { color1: '#6366f1', color2: '#8b5cf6', color3: '#ec4899' },
      { color1: '#3b82f6', color2: '#06b6d4', color3: '#10b981' },
      { color1: '#f59e0b', color2: '#ef4444', color3: '#8b5cf6' }
    ];
    
    let currentIndex = 0;
    
    const animateColors = () => {
      const nextIndex = (currentIndex + 1) % colors.length;
      const nextColors = colors[nextIndex];
      
      animate(document.documentElement, {
        '--color-1': nextColors.color1,
        '--color-2': nextColors.color2,
        '--color-3': nextColors.color3,
      }, { duration: 8, ease: "easeInOut" });
      
      currentIndex = nextIndex;
      setTimeout(animateColors, 8000);
    };
    
    animateColors();
  }, [isInView]);

  // Floating cards animation
  const randomizeFloatingCards = () => {
    setFloatingCards(prev => prev.map(card => ({
      ...card,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      rotation: Math.random() * 20 - 10,
      scale: 0.9 + Math.random() * 0.2
    })));
    
    setTimeout(randomizeFloatingCards, 8000);
  };

  // Parallax mouse effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width) * 100);
    mouseY.set((clientY / height) * 100);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-6 md:px-20 py-32 relative overflow-hidden"
      style={{
        '--color-1': '#6366f1',
        '--color-2': '#8b5cf6',
        '--color-3': '#ec4899',
      } as React.CSSProperties}
    >
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          background: gradientBackground,
          transition: 'background 0.4s ease-out'
        }}
      />
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <style jsx>{`
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px);
            background-size: 40px 40px;
          }
        `}</style>
      </div>
      
      {/* Floating 3D cards */}
      {isMounted && floatingCards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg p-6"
          style={{
            width: `${100 + card.id * 30}px`,
            height: `${120 + card.id * 30}px`,
            x: `${card.x}px`,
            y: `${card.y}px`,
            rotate: `${card.rotation}deg`,
            scale: card.scale,
            zIndex: card.zIndex
          }}
          animate={{
            x: `${card.x + (Math.random() * 20 - 10)}px`,
            y: `${card.y + (Math.random() * 20 - 10)}px`,
            transition: { 
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Main content */}
      <div ref={ref} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Text content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-600">Now in public beta</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Next-gen
              </span>{' '}
              <br />
              collaboration for{' '}
              <span className="relative inline-block">
                <span className="relative z-10">modern teams</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-3 bg-blue-100/80 z-0"
                  animate={{
                    width: ['0%', '100%', '0%'],
                    left: ['0%', '0%', '100%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Streamline your workflow with our AI-powered platform that connects your tools, team, and processes in one unified workspace.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium overflow-hidden group">
              <span className="relative z-10">Get Started Free</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </button>
            
            <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <span>See how it works</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm">Join 10,000+ teams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">99.9% uptime</span>
            </div>
          </motion.div>
        </div>
        
        {/* Hero image/illustration */}
        <motion.div 
          className="relative w-full max-w-2xl aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main illustration with floating effect */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 w-full h-full"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-white/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_10px_rgba(255,255,255,0.5)]"></div>
              </div>
              <Image
                src="/assets/hero.jpg"
                alt="Dashboard preview"
                width={800}
                height={800}
                className="w-full h-auto object-contain rounded-full"
                priority
              />
            </div>
          </motion.div>
          
          {/* Floating UI elements */}
          <motion.div
            className="absolute top-10 -left-10 w-24 h-24 bg-white rounded-xl shadow-lg border border-gray-100 p-3"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <div className="w-full h-full bg-blue-50 rounded-lg"></div>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-5 -right-5 w-28 h-28 bg-white rounded-xl shadow-lg border border-gray-100 p-3"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-full h-full bg-indigo-50 rounded-lg"></div>
          </motion.div>
          
          {/* Glowing highlight */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-blue-500 blur-3xl opacity-10 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center p-1"
          animate={{
            borderColor: ['rgba(209, 213, 219, 1)', 'rgba(165, 180, 252, 1)', 'rgba(209, 213, 219, 1)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full mt-1"
            animate={{
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}