import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

const faqs = [
  {
    question: 'What is Lynk?',
    answer: 'Lynk is a real-time collaboration platform where developers work on live projects with coaching, feedback, and skill tracking.',
  },
  {
    question: 'Is Lynk free to use?',
    answer: 'Yes, the core features are free. Premium coaching and bounties may have optional pricing.',
  },
  {
    question: 'How do I join a project?',
    answer: 'After creating a profile, you\'ll be matched with real micro-projects based on your skills and interests.',
  },
  {
    question: 'Can I get real-time feedback?',
    answer: 'Yes! Coaches and peers can provide live feedback through chat, video, or code review tools.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 px-4 md:px-16" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-500 md:text-lg">Everything you need to know about Lynk.</p>
        </motion.div>

        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <motion.button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-5 px-1 text-left"
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  <IoIosArrowDown className="text-xl" />
                </motion.span>
              </motion.button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 } 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.15 },
                        height: { duration: 0.25 } 
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-1 text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}