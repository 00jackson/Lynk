// sections/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { FaBolt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const steps = [
  {
    icon: <FaBolt size={28} className="text-blue-600" />,
    title: 'Instant Matching',
    description: 'Get paired with real micro-projects based on your skills and goals.',
  },
  {
    icon: <FaUsers size={28} className="text-green-600" />,
    title: 'Collaborate Live',
    description: 'Use the live editor and chat to work side-by-side with teammates or mentors.',
  },
  {
    icon: <FaCheckCircle size={28} className="text-purple-600" />,
    title: 'Track & Grow',
    description: 'Earn XP, collect feedback, and build a public portfolio.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-lg text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}