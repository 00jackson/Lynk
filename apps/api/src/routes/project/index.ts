import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create Project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, techStack, link } = req.body;

    const project = await prisma.project.create({
      data: { userId, title, description, techStack, link },
    });

    res.status(201).json(project);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create project', detail: err.message });
  }
});

// Read Projects
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(projects);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch projects', detail: err.message });
  }
});

// Update Project
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, link } = req.body;

    const updated = await prisma.project.update({
      where: { id },
      data: { title, description, techStack, link },
    });

    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update project', detail: err.message });
  }
});

// Delete Project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project', detail: err.message });
  }
});

export default router;