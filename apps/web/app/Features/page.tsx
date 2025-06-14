'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: '/assets/feature1.png',
    title: 'Instant Project Matching',
    text: 'Match with micro-projects from real-world businesses instantly.',
    highlight: true
  },
  {
    icon: '/assets/feature2.png',
    title: 'Expert Coaching',
    text: 'Get on-demand 1:1 coaching and expert feedback in minutes.',
    highlight: true
  },
  {
    icon: '/assets/feature3.png',
    title: 'Skill Tracking',
    text: 'Track your skills, growth trajectory, and receive endorsements.',
    highlight: false
  },
  {
    icon: '/assets/feature4.png',
    title: 'Public Building',
    text: 'Build in public, showcase progress, and gain real feedback.',
    highlight: false
  },
  {
    icon: '/assets/feature5.png',
    title: 'Premium Offerings',
    text: 'Offer bounties or premium coaching sessions to stand out.',
    highlight: false
  },
  {
    icon: '/assets/feature6.png',
    title: 'Gamified Learning',
    text: 'Earn XP, climb leaderboards, and collect contribution badges.',
    highlight: false
  },
];

export default function FeatureOverview() {
  return (
    <section id="Features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Accelerate Your Growth
        </motion.h2>
        {/* <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Everything you need to launch, learn, and lead in your tech career
        </motion.p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map(({ icon, title, text, highlight }, index) => (
          <motion.div
            key={index}
            className={`relative rounded-xl p-8 ${highlight ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-white'} ${highlight ? 'shadow-lg' : 'shadow-md'} border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {highlight && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-white text-blue-600 font-semibold rounded-full text-sm shadow-sm">
                Popular
              </div>
            )}
            <div className={`w-14 h-14 mb-6 rounded-lg flex items-center justify-center ${highlight ? 'bg-white/20' : 'bg-blue-50'}`}>
              <Image 
                src={icon} 
                alt={title} 
                width={28} 
                height={28} 
                className={`object-contain ${highlight ? 'filter brightness-0 invert' : ''}`}
              />
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${highlight ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <p className={`${highlight ? 'text-blue-100' : 'text-gray-600'}`}>
              {text}
            </p>
            {highlight && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
}