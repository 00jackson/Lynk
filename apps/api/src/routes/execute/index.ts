import express, { RequestHandler } from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

// Enable CORS for your frontend
router.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

router.post('/', (async (req, res) => {
  const { language, code, stdin } = req.body;
  console.log('Execute Request Received:', { language, code });
  try {
    const { language, version, code, stdin } = req.body;

    if (!language || !code) {
      return res.status(400).json({ error: 'Missing language or code' });
    }

    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language,
      version: version || '*', // Default to latest version
      files: [{ content: code }],
      stdin: stdin || ''
    });

    res.status(200).json(response.data);
  } catch (err: any) {
    console.error('Code execution error:', err);
    res.status(500).json({ 
      error: 'Failed to execute code', 
      detail: err.message 
    });
  }
}) as RequestHandler);

export default router;