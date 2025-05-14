// apps/web/app/dashboard/page.tsx
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
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-10 mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome back, {profile.name}
        </h1>
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 space-y-5">
          <p className="text-base text-gray-800">
            <span className="font-semibold text-gray-900">Role:</span> {profile.role}
          </p>
          <p className="text-base text-gray-800">
            <span className="font-semibold text-gray-900">Skills:</span> {profile.skills.join(', ')}
          </p>
        </div>
        <ProjectList userId={userId} />
      </div>
    </main>
  );
}