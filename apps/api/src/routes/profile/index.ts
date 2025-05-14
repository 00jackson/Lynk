// apps/api/src/routes/profile/index.ts

import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const prisma = new PrismaClient();
const router = Router(); // ✅ not express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: 'Missing userId in query parameters. Please pass ?userId=your_user_id' });
      return;
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: String(userId) },
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json(profile);
    return;
  } catch (err) {
    console.error('GET /profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, role, skills } = req.body;
    if (!userId || !name || !role) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    const newProfile = await prisma.userProfile.create({
      data: { userId, name, role, skills },
    });

    res.status(201).json(newProfile);
    return;
  } catch (err) {
    console.error('POST /profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});


export default router;