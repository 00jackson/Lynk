import express, { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Missing message' });
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const result = await model.generateContent([message]);
    const response = result.response;
    const suggestion = response.text();

    res.json({ suggestion });
  } catch (err: any) {
    console.error('[Gemini AI Error]', err);
    res.status(500).json({
      error: 'AI service failed. Please try again later.',
      details: err?.message || 'Unknown error',
    });
  }
});

export default router;