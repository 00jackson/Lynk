// apps/api/src/routes/user/save.ts

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';


const prisma = new PrismaClient();
const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, name, role, skills } = req.body;

    if (!userId || !name || !role || !skills) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    const profile = await prisma.userProfile.create({
      data: { userId, name, role, skills },
    });

    res.status(200).json(profile);
  } catch (error: any) {
    console.error('Save user error:', error); // 👈 log it properly
    res.status(500).json({ error: 'Failed to save user', detail: error.message });
  }
});


export default router;