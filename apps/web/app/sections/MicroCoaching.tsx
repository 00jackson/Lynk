'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { IoVideocam, IoTime } from 'react-icons/io5';

export default function MicroCoaching() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-24 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
        }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-gray-900">
            Code Confidently. Get Help Instantly.
          </h2>
          <p className="text-lg text-gray-600">
            One-on-one coaching, async support, or live screen shares — available when you need it most.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <HiChatBubbleLeftRight className="text-blue-600 mt-0.5" size={24} />
              <span className="text-gray-700">Live Chat with Coaches</span>
            </li>
            <li className="flex items-start gap-4">
              <IoVideocam className="text-blue-600 mt-0.5" size={24} />
              <span className="text-gray-700">Video Call Support</span>
            </li>
            <li className="flex items-start gap-4">
              <IoTime className="text-blue-600 mt-0.5" size={24} />
              <span className="text-gray-700">Async Help Within Hours</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="rounded-xl overflow-hidden shadow-xl"
        >
          <Image
            src="/assets/Coaching.jpg"
            alt="Live coaching demo"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-5 pointer-events-none bg-[url('/assets/abstract.jpg')] bg-repeat opacity-20" />
    </section>
  );
}
