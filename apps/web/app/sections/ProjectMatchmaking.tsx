'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'Redesign NGO Landing Page',
    tag: 'Frontend',
    description: 'Help a local NGO revamp their donation page using Tailwind and React.',
  },
  {
    title: 'Fix Cart Bug in E-Commerce App',
    tag: 'Fullstack',
    description: 'Debug and fix cart total mismatch issue in a MERN stack app.',
  },
  {
    title: 'Integrate Stripe for Course Payments',
    tag: 'Backend',
    description: 'Integrate secure Stripe checkout into a coaching platform.',
  },
  {
    title: 'Build Portfolio Generator Tool',
    tag: 'Fullstack',
    description: 'Create a web tool that generates personal portfolios from GitHub profiles.',
  },
  {
    title: 'Develop AI Chatbot for Student FAQs',
    tag: 'AI',
    description: 'Implement a GPT-powered chatbot to assist students with common queries.',
  },
  {
    title: 'Migrate Blog to Next.js',
    tag: 'Frontend',
    description: 'Help a blogger migrate their site from WordPress to Next.js for better performance.',
  },
];

export default function ProjectMatchmaking() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
        }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Real Projects. Real Impact.
        </motion.h2>
        <motion.p
          className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Get matched with real-world micro-projects based on your interests and skills. Build. Solve. Contribute.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">{proj.title}</h3>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mb-3">
                {proj.tag}
              </span>
              <p className="text-gray-700 text-sm">{proj.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-base">
            Browse More Projects
          </button>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: 1.05, rotate: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      >
        <svg className="w-full h-full" viewBox="0 0 1024 1024" fill="none">
          <circle cx="512" cy="512" r="400" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}