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
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Welcome back, {profile.name}</h1>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <ProjectList />
    </div>
  );
}