'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { IoVideocam, IoTime, IoCodeSlash } from 'react-icons/io5';
import { FiMic, FiSend } from 'react-icons/fi';

export default function MicroCoaching() {
  return (
    <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/assets/Coaching.jpg"
          alt=""
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/70 to-blue-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center min-h-[650px]"
        >
          {/* Text Content */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            className="space-y-8 text-white"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Code <span className="text-blue-300">Confidently</span>.<br />
              Get Help <span className="text-violet-300">Instantly</span>.
            </motion.h2>
            
            <motion.p
              className="text-lg text-blue-100 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              One-on-one coaching, async support, or live screen shares — available when you need it most.
            </motion.p>

            <motion.ul
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <HiChatBubbleLeftRight className="text-blue-300" size={24} />
                </div>
                <span className="text-blue-50 text-lg">Live Chat with Coaches</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-violet-600/20 rounded-lg">
                  <IoVideocam className="text-violet-300" size={24} />
                </div>
                <span className="text-blue-50 text-lg">Video Call Support</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <IoTime className="text-blue-300" size={24} />
                </div>
                <span className="text-blue-50 text-lg">Async Help Within Hours</span>
              </li>
            </motion.ul>
          </motion.div>

          {/* iPhone 15 Pro Max Mockup */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -20, rotate: -3 }}
              animate={{ y: 20, rotate: 3 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              className="relative w-[350px] h-[700px]"
            >
              {/* Titanium Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-[50px] p-3 shadow-2xl border-[12px] border-gray-800/80 overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-full z-20 flex justify-center items-center gap-1 px-4">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-8 h-2 bg-gray-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
                
                {/* Screen Content */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-900/90 to-violet-900/90 rounded-[38px] overflow-hidden">
                  {/* Mock Chat UI */}
                  <div className="absolute inset-0 flex flex-col pt-10">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 py-1">
                      <span className="text-xs font-medium text-blue-200">9:41</span>
                      <div className="flex space-x-2">
                        <svg className="w-4 h-4 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7h2c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1h-2v2h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-1V7zm-4 0h-1v2h1c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-1v2h1c2.21 0 4-1.79 4-4V9c0-2.21-1.79-4-4-4zM5 7h1v2H5c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h1v2H5c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4z"/>
                        </svg>
                        <svg className="w-4 h-4 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7h2c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1h-2v2h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-1V7zm-4 0h-1v2h1c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-1v2h1c2.21 0 4-1.79 4-4V9c0-2.21-1.79-4-4-4zM5 7h1v2H5c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h1v2H5c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-6 pb-4 border-b border-blue-700/30">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center">
                          <HiChatBubbleLeftRight className="text-blue-300" size={20} />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-900"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-100 font-medium text-normal">Code Coach</h4>
                        <p className="text-sm text-blue-300/80">Typing...</p>
                      </div>
                      <div className="flex space-x-3">
                        <button className="p-2 text-blue-300 hover:text-white rounded-full bg-blue-800/30">
                          <IoVideocam size={15} />
                        </button>
                        <button className="p-2 text-blue-300 hover:text-white rounded-full bg-blue-800/30">
                          <FiMic size={15} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 space-y-5 p-6 overflow-y-auto">
                      <div className="flex justify-center">
                        <span className="text-xs text-blue-300/50 px-3 py-1 bg-blue-900/20 rounded-full">Today</span>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-blue-800/50 rounded-3xl rounded-tl-none px-5 py-4">
                          <p className="text-blue-100 text-xs">Hi there! I'm your code coach. What are you working on today?</p>
                          <span className="text-xs text-blue-300/50 mt-1 block text-right">9:42 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-violet-600 rounded-3xl rounded-tr-none px-5 py-4">
                          <div className="flex items-start gap-3">
                            <IoCodeSlash className="text-white/80 mt-0.5 flex-shrink-0" size={10} />
                            <p className="text-white text-xs">I'm getting a state management error in my Next.js app when trying to update the cart.</p>
                          </div>
                          <span className="text-xs text-violet-200/70 mt-1 block text-right">9:43 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-blue-800/50 rounded-3xl rounded-tl-none px-5 py-4">
                          <p className="text-blue-100 text-xs">Let me help with that. Would you like to:</p>
                          <div className="mt-3 space-y-3">
                            <button className="w-full text-left text-sm text-blue-100 px-4 py-2.5 bg-blue-700/40 rounded-xl hover:bg-blue-700/60 transition">
                              Share your screen
                            </button>
                            <button className="w-full text-left text-sm text-blue-100 px-4 py-2.5 bg-blue-700/40 rounded-xl hover:bg-blue-700/60 transition">
                              Send code snippet
                            </button>
                            <button className="w-full text-left text-sm text-blue-100 px-4 py-2.5 bg-blue-700/40 rounded-xl hover:bg-blue-700/60 transition">
                              Debug together
                            </button>
                          </div>
                          <span className="text-xs text-blue-300/50 mt-2 block text-right">9:43 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="p-5 border-t border-blue-700/30 bg-blue-950/30">
                      <div className="flex items-center gap-3">
                        <button className="p-2.5 text-blue-300 hover:text-white rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </button>
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 bg-blue-900/30 border border-blue-700/30 rounded-full py-3 px-5 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm"
                        />
                        <button className="p-2.5 text-blue-300 hover:text-white rounded-full bg-violet-600/80">
                          <FiSend size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Button (simulated) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-400/50 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl -z-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </section>
  );
}