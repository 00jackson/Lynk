'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
// import FeatureOverview from "./sections/FeatureOverview";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <main
      ref={ref}
      className={`min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900 flex flex-col items-center justify-center px-6 md:px-20 py-20 relative gap-24 transition-opacity duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center md:text-left space-y-6 px-4"
        >
          <h1 className="text-5xl font-extrabold leading-tight text-blue-600">
            Build smarter. Connect faster.
          </h1>
          <p className="text-lg text-gray-700">
            Discover how creators and teams use Lynk to accelerate product workflows, connect ideas, and ship faster with purpose.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-base hover:bg-blue-700 transition">Start Building</button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md text-base hover:border-blue-500 hover:text-blue-600 transition">Learn More</button>
          </div>
        </motion.div>
        <div className="relative px-4">
          <motion.div
            className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full z-0"
            initial={{ x: -50, y: -50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-200 rounded-full z-0"
            initial={{ x: 50, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <Image
              src="/assets/hero.jpg"
              alt="Hero Illustration"
              width={400}
              height={400}
              className="w-full h-auto rounded-full aspect-square object-cover relative z-10"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="512" cy="512" r="400" fill="url(#grad1)" />
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-1 h-1/2 bg-gradient-to-b from-blue-600 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-1 h-1/2 bg-gradient-to-t from-blue-600 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-600 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20"></div>
      </div>
      {/* <FeatureOverview /> */}
    </main>
  );
}