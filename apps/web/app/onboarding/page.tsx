'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function OnboardingPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  const allSkills = ['Frontend', 'Backend', 'UI/UX', 'DevOps', 'AI/ML', 'Marketing']

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const { user } = useUser();

const handleSubmit = async () => {
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

  if (res.ok) {
    router.push("/dashboard");
  } else {
    alert("Failed to save profile");
  }
};

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Complete Your Profile</h1>

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

      <button onClick={handleSubmit} className="w-full bg-black text-white py-2 rounded">
        Save & Continue
      </button>
    </div>
  )
}