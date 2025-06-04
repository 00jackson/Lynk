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
import { FaCrown, FaFire, FaChartLine, FaUserFriends } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Define types for our data
type StreakDay = {
  day: string;
  active: boolean;
};

type LeaderboardUser = {
  rank: number;
  name: string;
  xp: number;
  you: boolean;
};

// Radar chart data configuration
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
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "#6366F1",
      borderWidth: 2,
      pointBackgroundColor: "#6366F1",
      pointBorderColor: "#fff",
      pointHoverRadius: 6,
    },
  ],
};

// Radar chart options
// Radar chart options
const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: "rgba(200, 200, 200, 0.3)"
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        display: false,
        stepSize: 20
      },
      grid: {
        color: "rgba(200, 200, 200, 0.3)"
      },
      pointLabels: {
        font: {
          size: 11,
          family: "'Inter', sans-serif",
        },
        color: "#4B5563"
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1E293B",
      titleFont: {
        size: 12,
        weight: "bold" as const, // <-- Fix here
      },
      bodyFont: {
        size: 12
      },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (context: any) => {
          return `${context.label}: ${context.raw}%`;
        }
      }
    }
  },
  elements: {
    line: {
      tension: 0.1
    }
  }
};

export default function SkillTrackingSection() {
  // ... 

  // Streak data
  const streakDays: StreakDay[] = [
    { day: "S", active: true },
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: false },
    { day: "T", active: true },
    { day: "F", active: false },
    { day: "S", active: false },
  ];

  // Leaderboard data
  const leaderboardData: LeaderboardUser[] = [
    { rank: 1, name: 'Alex', xp: 420, you: false },
    { rank: 2, name: 'Jamie', xp: 390, you: false },
    { rank: 3, name: 'You', xp: 270, you: true },
    { rank: 4, name: 'Taylor', xp: 210, you: false }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Your Learning Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-normal md:text-lg"
          >
            Visualized progress in a clean, distraction-free interface
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Radar - Left Panel - Made more compact */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FaChartLine className="text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">Skill Assessment</h3>
                <p className="text-xs md:text-sm text-gray-500">Updated 2 hours ago</p>
              </div>
            </div>
            <div className="h-[300px] md:h-[350px] relative"> {/* Added relative positioning */}
              <div className="absolute inset-0 flex items-center justify-center"> {/* Centering wrapper */}
                <div className="w-full h-full max-w-[900px] mt-10"> {/* Constrained maximum size */}
                  <Radar
                    data={skillData}
                    options={{
                      ...radarOptions,
                      plugins: {
                        ...radarOptions.plugins,
                        tooltip: {
                          ...radarOptions.plugins.tooltip,
                          bodyFont: {
                            size: 13
                          },
                          titleFont: {
                            size: 14,
                            weight: "bold" as const
                          }
                        }
                      },
                      // Increase the size of radar elements
                      elements: {
                        point: {
                          radius: 4, // Increased from default 3
                          hoverRadius: 6
                        },
                        line: {
                          borderWidth: 2.5, // Increased from default 2
                          tension: 0.1
                        }
                      },
                      // Adjust scale to use more space
                      scales: {
                        r: {
                          ...radarOptions.scales.r,
                          pointLabels: {
                            font: {
                              size: 12, // Increased from 11
                              family: "'Inter', sans-serif",
                            },
                            color: "#4B5563"
                          },
                          ticks: {
                            display: false,
                            stepSize: 20,
                            backdropColor: 'transparent' // Remove tick background
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Made more compact */}
          <div className="space-y-6">
            {/* Streak Tracker */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <FaFire className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">Learning Streak</h3>
                  <p className="text-xs md:text-sm text-gray-500">5 days active</p>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                {streakDays.map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center 
                      ${day.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'} text-sm`}>
                      {day.day}
                    </div>
                    <span className="text-[10px] md:text-xs mt-1 text-gray-500">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <IoMdRocket className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">Level Progress</h3>
                  <p className="text-xs md:text-sm text-gray-500">Level 3 - 270/400 XP</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                    style={{ width: '67%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mt-1">
                  <span>0 XP</span>
                  <span>400 XP</span>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FaUserFriends className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">Community Rank</h3>
                  <p className="text-xs md:text-sm text-gray-500">Top 20% of learners</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {leaderboardData.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm
                      ${user.you ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${user.rank <= 3 ? 'text-blue-600' : 'text-gray-600'}`}>
                        {user.rank}.
                      </span>
                      <span>{user.name}</span>
                      {user.rank === 1 && <FaCrown className="text-yellow-400 text-sm" />}
                    </div>
                    <span className="text-xs md:text-sm font-medium">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 md:p-8 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Unlock Advanced Analytics</h3>
              <p className="text-blue-100 text-sm md:text-base max-w-lg">
                Get personalized recommendations and detailed progress reports with Premium.
              </p>
            </div>
            <button className="mt-3 md:mt-0 px-5 py-1.5 md:px-6 md:py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition text-sm md:text-base">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}