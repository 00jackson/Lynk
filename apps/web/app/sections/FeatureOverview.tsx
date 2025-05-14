'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  { icon: '/assets/feature1.png', text: 'Match with micro-projects from real-world businesses instantly.' },
  { icon: '/assets/feature2.png', text: 'Get on-demand 1:1 coaching and expert feedback in minutes.' },
  { icon: '/assets/feature3.png', text: 'Track your skills, growth trajectory, and receive endorsements.' },
  { icon: '/assets/feature4.png', text: 'Build in public, showcase progress, and gain real feedback.' },
  { icon: '/assets/feature5.png', text: 'Offer bounties or premium coaching sessions to stand out.' },
  { icon: '/assets/feature6.png', text: 'Earn XP, climb leaderboards, and collect contribution badges.' },
];

export default function FeatureOverview() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="w-fit mx-auto mb-14 text-4xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-full shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Launch. Learn. Lead.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {features.map(({ icon, text }, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-6 p-6 rounded-3xl shadow-xl bg-white hover:shadow-2xl transition-shadow border border-blue-100 hover:border-blue-300 hover:scale-[1.02] transform duration-300 ease-in-out"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="w-14 h-14 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                <Image src={icon} alt="feature icon" width={56} height={56} className="object-contain" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
}