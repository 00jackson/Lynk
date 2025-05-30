import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import ProjectList from './ProjectList';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-8 text-red-600">Not authorized</div>;
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return <div className="p-8 text-gray-500">No profile found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Welcome and Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-800">
              Welcome back, <span className="text-blue-600">{profile.name}</span>
            </h1>
            <p className="text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {/* Stats Cards - Horizontal Layout */}
          <div className="flex gap-3">
            <div className="text-center px-4 py-2 border-b-2 border-blue-100">
              <p className="text-xs text-gray-500">Projects</p>
              <p className="text-lg font-medium text-gray-800">6</p>
            </div>
            <div className="text-center px-4 py-2 border-b-2 border-purple-100">
              <p className="text-xs text-gray-500">Rank</p>
              <p className="text-lg font-medium text-gray-800">#12</p>
            </div>
            <div className="text-center px-4 py-2 border-b-2 border-green-100">
              <p className="text-xs text-gray-500">Streak</p>
              <p className="text-lg font-medium text-gray-800">5</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile & Actions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Profile Overview
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Role</p>
                  <p className="text-gray-800 font-medium">{profile.role}</p>
                </div>
                <div>
                  <p className="text-gray-500">Skills</p>
                  <p className="text-gray-800 font-medium">{profile.skills.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                Quick Actions
              </h2>
              <ul className="space-y-3">
                <li>
                  <button className="w-full text-left px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">
                    + New Project
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition">
                    Request Coaching
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition">
                    Edit Profile
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content Area - Projects */}
          <div className="lg:col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  Your Projects
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <ProjectList userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}