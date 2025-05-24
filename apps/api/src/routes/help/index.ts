import { Router, Request, Response } from 'express';
import { PrismaClient } from '@lynk/prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create help request
router.post('/', async (req: Request, res: Response) => {
  console.log('[API] POST /api/help route hit');
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      res.status(400).json({ error: 'Missing userId or message' });
      return;
    }

    const defaultCoachId = 'clrk_abc123'; // TODO: query available coach
    const helpRequest = await prisma.helpRequest.create({
      data: { userId, message, coachId: defaultCoachId },
    });

    res.status(201).json(helpRequest);
  } catch (err: any) {
    console.error('Help request error:', err);
    res.status(500).json({ error: 'Failed to submit help request' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, coachId } = req.body;

    if (!status && !coachId) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    const updated = await prisma.helpRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(coachId && { coachId }),
      },
    });

    res.status(200).json(updated);
  } catch (err: any) {
    console.error('Update help request error:', err);
    res.status(500).json({ error: 'Failed to update help request' });
  }
});

// Get help requests (optional filter by userId or status)
router.get('/', async (req: Request, res: Response) => {
  try {

    const { userId, status } = req.query;
    const { coachId } = req.query;
    
    const helpRequests = await prisma.helpRequest.findMany({
      where: {
        ...(userId ? { userId: String(userId) } : {}),
        ...(coachId ? { coachId: String(coachId) } : {}),
        ...(status ? { status: String(status) } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(helpRequests);
  } catch (err: any) {
    console.error('Fetch help requests error:', err);
    res.status(500).json({ error: 'Failed to fetch help requests' });
  }
});

export default router as import('express').Router;