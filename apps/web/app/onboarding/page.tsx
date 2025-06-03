'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function OnboardingPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [width, height] = useWindowSize();

  const allSkills = ['Frontend', 'Backend', 'UI/UX', 'DevOps', 'AI/ML', 'Marketing']

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const { user } = useUser();

  const handleSubmit = async () => {
    if (!user?.id || !name || !role || skills.length === 0) {
      alert("सभी फ़ील्ड भरें और कम से कम एक skill चुनें।");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4001/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          name,
          role,
          skills,
        }),
      });

      if (res.status === 409) {
        alert("User profile पहले से मौजूद है।");
      } else if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2500);
      } else {
        alert("Failed to save profile");
      }
    } catch (error) {
      alert("Network error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md mx-4 space-y-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full blur-xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full blur-xl opacity-30"></div>

        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900"
          >
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Lynk
            </Link>
          </motion.h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
            <input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjJ2M3Y0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              <option value="">Select your primary role</option>
              <option value="Developer">Developer</option>
              <option value="Coach">Coach</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your skills</label>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <motion.button
                  key={skill}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${skills.includes(skill)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } shadow-sm`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save & Continue'
          )}
        </motion.button>

        <AnimatePresence>
          {success && (
            <>
              <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-white p-8 rounded-xl shadow-xl text-center border border-gray-100"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">🎉 Welcome to Lynk!</h2>
                  </motion.div>
                  <p className="text-gray-600 mb-4">Your profile is all set!</p>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}