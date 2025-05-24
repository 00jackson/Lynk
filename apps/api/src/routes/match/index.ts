import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', (req: Request, res: Response): void => {
  (async () => {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid userId' });
    }
  
    const user = await prisma.userProfile.findUnique({ where: { userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const projects = await prisma.project.findMany();

    const scoredProjects = projects
      .map((project) => {
        const tags = project.techStack || [];
        const skillMatches = tags.filter((tag) => user.skills.includes(tag)).length;
        const score = skillMatches;
        return { ...project, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    res.json(scoredProjects);
  })().catch((err) => {
    console.error("Match error:", err);
    res.status(500).json({ error: 'Matching failed', detail: err.message });
  });
});

export default router;  