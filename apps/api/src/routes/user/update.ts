

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Update User Profile
router.put('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, name, role, skills } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'Missing userId' });
      return;
    }

    const updated = await prisma.userProfile.update({
      where: { userId },
      data: { name, role, skills },
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update user', detail: error.message });
  }
});

export default router;