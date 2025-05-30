import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Log when loaded
console.log('[API] Project routes loaded');

// GET /api/project?userId=abc
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const projects = await prisma.project.findMany({
      where: userId ? { userId: String(userId) } : undefined,
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(projects);
  } catch (error: any) {
    console.error('GET /project error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// ✅ ADD THIS:
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      title,
      description,
      techStack,
      link,
      folder,
      startDate,
      endDate,
      notes,
      baseRate,
      minBudget,
      maxBudget,
      showToEditors,
      showToClient,
      autoReset,
      sendAlerts,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        userId,
        title,
        description,
        techStack,
        link,
        folder,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        notes,
        baseRate,
        minBudget,
        maxBudget,
        showToEditors,
        showToClient,
        autoReset,
        sendAlerts,
      },
    });

    res.status(201).json(project);
  } catch (error: any) {
    console.error('POST /project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// DELETE /api/project/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (err: any) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project', detail: err.message });
  }
});

export default router;
