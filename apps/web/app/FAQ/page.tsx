'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

const faqs = [
  {
    question: 'How does Lynk differ from other coding platforms?',
    answer: 'Lynk combines live project collaboration with real-time micro-coaching and skill validation, creating a complete growth ecosystem rather than just isolated challenges or courses.',
  },
  {
    question: 'What skill levels is Lynk suitable for?',
    answer: 'We cater to all levels - from beginners (through guided projects) to senior developers (via complex bounties and coaching opportunities). Our matching system ensures appropriate challenges.',
  },
  {
    question: 'How are projects matched to developers?',
    answer: 'Our AI analyzes your skill profile, learning goals, and past project performance to match you with optimal micro-projects that stretch your abilities without overwhelming you.',
  },
  {
    question: 'What technologies does Lynk support?',
    answer: 'We support all major web technologies (JavaScript frameworks, Python, etc.) with plans to expand. Each project clearly lists its tech stack before you commit.',
  },
  {
    question: 'How does the coaching system work?',
    answer: 'Coaches are available for live sessions or async code reviews. You can book micro-sessions (15-30 mins) focused on specific challenges from your current project.',
  },
  {
    question: 'Can I use Lynk for portfolio building?',
    answer: 'Absolutely. All completed projects generate verified skill badges and shareable project cards that showcase your contributions and coach feedback.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Clear Answers to Common Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Can't find what you're looking for? <a href="#contact" className="text-blue-500 hover:text-violet-600 transition-colors">Contact our team</a>.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-5 px-6 text-left"
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-gray-400"
                >
                  <IoIosArrowDown className="text-xl" />
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: { 
                        opacity: { duration: 0.2, ease: 'easeIn' },
                        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.15 },
                        height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 shadow-sm transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}