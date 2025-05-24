-- AlterTable
ALTER TABLE "HelpRequest" ADD COLUMN     "coachId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
