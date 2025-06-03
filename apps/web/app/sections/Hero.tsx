'use client';
import { motion, useMotionTemplate, useMotionValue, animate, AnimationPlaybackControls } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Enhanced dynamic gradient with individual color control
  const color1 = useMotionValue('#3b82f6');
  const color2 = useMotionValue('#6366f1');
  const color3 = useMotionValue('#ec4899');
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color1}, ${color2}, ${color3})`;

  // Animate the text gradient with complex sequences
  useEffect(() => {
    if (!isInView) return;
    
    const sequences = [
      { colors: ['#3b82f6', '#6366f1', '#ec4899'], duration: 8 },
      { colors: ['#60a5fa', '#a855f7', '#f43f5e'], duration: 6 },
      { colors: ['#2563eb', '#7c3aed', '#db2777'], duration: 7 },
      { colors: ['#1d4ed8', '#6d28d9', '#be185d'], duration: 5 }
    ];
    
    let sequenceIndex = 0;
    const animations: AnimationPlaybackControls[] = [];

    const cycleGradient = () => {
      // Stop any existing animations
      animations.forEach(anim => anim.stop());
      animations.length = 0;
      
      const currentSequence = sequences[sequenceIndex % sequences.length];
      
      // Animate each color separately with different durations
      animations.push(
        animate(color1, currentSequence.colors[0], {
          duration: currentSequence.duration * 0.8,
          ease: "easeInOut"
        }),
        animate(color2, currentSequence.colors[1], {
          duration: currentSequence.duration,
          ease: "easeInOut"
        }),
        animate(color3, currentSequence.colors[2], {
          duration: currentSequence.duration * 1.2,
          ease: "easeInOut"
        })
      );

      sequenceIndex++;
      
      // Schedule next cycle
      const timeout = setTimeout(cycleGradient, currentSequence.duration * 1500);
      return () => clearTimeout(timeout);
    };

    cycleGradient();

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [isInView, color1, color2, color3]);

  // Animation configs
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100 
      }
    }
  };

  const floating = {
    float: {
      y: ["0%", "-5%", "0%"],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Parallax mouse effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((clientX - left - width/2) / 25);
    mouseY.set((clientY - top - height/2) / 25);
  };

  return (
    <main
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-gray-900 flex flex-col items-center justify-center px-6 md:px-20 py-20 relative overflow-hidden transition-opacity duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-mesh-pattern"
          style={{
            x: mouseX,
            y: mouseY
          }}
        />
        <style jsx>{`
          .bg-mesh-pattern {
            background-image: 
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 25%);
            background-size: 200% 200%;
          }
        `}</style>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 2 === 0 ? 'bg-indigo-400' : 'bg-pink-400'} opacity-30`}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Main content container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-6xl"
      >
        {/* Text content */}
        <motion.div className="max-w-2xl text-center md:text-left space-y-8 px-4">
          <motion.h1 
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            style={{ 
              backgroundImage: textGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Build smarter.<br className="hidden md:block" /> Connect <span className="whitespace-nowrap">faster.</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-gray-500 leading-relaxed"
          >
            Discover how creators and teams use <span className="font-semibold text-blue-600">Lynk</span> to accelerate product workflows, connect ideas, and ship faster with purpose.
          </motion.p>
          
          <motion.div 
            variants={container}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          >
            <motion.button 
              variants={item}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ 
                scale: 0.95,
                boxShadow: '0 5px 15px -5px rgba(59, 130, 246, 0.4)'
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-medium transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Start Building</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.button>
            
            <motion.button 
              variants={item}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(239, 246, 255, 1)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 rounded-xl text-lg font-medium transition-all hover:shadow-md"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image container */}
        <motion.div 
          className="relative px-4"
          variants={container}
        >
          {/* Decorative shapes */}
          <motion.div
            className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-3xl z-0 blur-xl"
            variants={item}
            custom={0}
            animate={{
              rotate: [0, 5, 0],
              borderRadius: ["20%", "25%", "20%"]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-10 -right-10 w-72 h-72 bg-indigo-100 rounded-[40%] z-0 blur-xl"
            variants={item}
            custom={1}
            animate={{
              rotate: [0, -8, 0],
              borderRadius: ["40%", "35%", "40%"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Main image with 3D tilt effect */}
          <motion.div
            variants={item}
            custom={2}
            className="relative z-10"
            style={{
              rotateX: mouseY,
              rotateY: mouseX,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <motion.div
              variants={floating}
              animate="float"
              className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/90"
            >
              <Image
                src="/assets/hero.jpg"
                alt="Hero Illustration"
                width={600}
                height={600}
                className="w-full h-auto aspect-square object-cover relative z-10"
                priority
              />
            </motion.div>
          </motion.div>
          
          {/* Glowing highlight */}
          <motion.div 
            className="absolute top-1/4 -right-5 w-24 h-24 bg-blue-400 rounded-full z-0 blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        variants={item}
      >
        <div className="text-sm text-blue-600 font-medium mb-2">Scroll to explore</div>
        <motion.div
          className="w-8 h-12 border-2 border-blue-600 rounded-full flex justify-center p-1"
          animate={{
            borderColor: ['rgba(59, 130, 246, 1)', 'rgba(99, 102, 241, 1)', 'rgba(59, 130, 246, 1)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mt-1"
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