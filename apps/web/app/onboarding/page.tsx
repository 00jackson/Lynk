'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-xl space-y-6 relative">
        <h1 className="text-3xl font-bold text-center text-blue-600">Complete Your Profile</h1>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select role</option>
          <option value="Developer">Developer</option>
          <option value="Coach">Coach</option>
          <option value="Startup">Startup</option>
        </select>

        <div className="space-y-2">
          <p className="font-medium">Pick your skills</p>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded border ${
                  skills.includes(skill)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>

      {success && (
        <>
          <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center animate-bounce transition-all">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">🎉 Welcome to the Den!</h2>
              <p className="text-gray-700">Redirecting to your dashboard...</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}