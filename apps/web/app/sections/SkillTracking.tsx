import { useState } from "react";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCrown, FaUserCircle } from "react-icons/fa";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillTrackingSection() {
  const [streakType, setStreakType] = useState<"daily" | "weekly">("daily");

  const dailyStreak = [
    { day: "S", active: true },
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: false },
    { day: "T", active: true },
    { day: "F", active: false },
    { day: "S", active: false },
  ];

  const weeklyStreak = [
    { week: "W1", active: true },
    { week: "W2", active: true },
    { week: "W3", active: false },
    { week: "W4", active: false },
  ];

  const streakData = streakType === "daily" ? dailyStreak : weeklyStreak;

  const skillData = {
    labels: [
      "Frontend",
      "Backend",
      "UI/UX",
      "DevOps",
      "AI",
      "Communication",
      "Problem Solving",
      "Teamwork",
    ],
    datasets: [
      {
        label: "Skill Level",
        data: [80, 65, 70, 50, 40, 85, 75, 90],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const xp = 270;
  const level = 3;
  const xpGoal = 400;

  const leaderboard = [
    { name: "Xyaa", xp: 320 },
    { name: "Bryan", xp: 290 },
    { name: "Dan", xp: 250 },
    { name: "You", xp: 200 },
    { name: "Micheal", xp: 130 },
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-blue-600"
          >
            Track Your Growth, One Skill at a Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-xl mx-auto"
          >
            Your journey, visualized beautifully — from skill stats to progress streaks.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-lg"
          >
            <h4 className="text-lg font-semibold mb-4">Skill Radar</h4>
            <Radar
              data={skillData}
              options={{
                responsive: true,
                scales: {
                  r: {
                    angleLines: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false },
                    pointLabels: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </motion.div>

          {/* Right: XP Tracker, Streak Tracker, Leaderboard */}
          <div className="space-y-6">
            {/* XP Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold mb-2">XP Progress</h4>
              <div className="relative w-full bg-blue-100 h-4 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(xp / xpGoal) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Level {level} · {xp} XP / {xpGoal} XP
              </p>
            </motion.div>

            {/* Streak Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Streak Tracker</h4>
                <div className="flex border border-gray-200 rounded-md overflow-hidden text-sm">
                  {["daily", "weekly"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setStreakType(type as "daily" | "weekly")}
                      className={`px-4 py-1 ${
                        streakType === type
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800"
                      } transition`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-4">
                {streakData.map((item, idx) => (
                  <div
                    key={idx}
                    title={
                      "day" in item
                        ? `Day: ${item.day}`
                        : `Week: ${item.week}`
                    }
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-normal ${
                      item.active
                        ? "bg-blue-500"
                        : "bg-gray-300 text-white"
                    } shadow-sm`}
                  >
                    {"day" in item ? item.day : item.week}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold text-center mb-6">Leaderboard</h4>
              <div className="divide-y">
                {leaderboard.map((user, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center py-3 px-2 ${
                      user.name === "You" ? "bg-blue-100 rounded-lg" : ""
                    }`}
                  >
                    <span className="font-medium flex items-center gap-2">
                      {idx + 1}. {user.name}
                      {idx === 0 && <FaCrown className="text-yellow-500" />}
                      {idx === 1 && <FaCrown className="text-gray-400" />}
                      {idx === 2 && <FaCrown className="text-yellow-700" />}
                    </span>
                    <span className="text-gray-500 text-sm">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
