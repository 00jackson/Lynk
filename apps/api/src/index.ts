import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project';
import userRoutes from './routes/user/save'; // ✅ Add this
import profileRoutes from './routes/profile';
import matchRoutes from './routes/match';
import helpRoutes from './routes/help';
import executeRoutes from './routes/execute';
import aiSuggestRoutes from './routes/help/ai-suggest';
import http from 'http';
import { setupSocket } from './socket';
import 'dotenv/config';

const app = express(); 
const server = http.createServer(app);
setupSocket(server);
// Use a single port binding for both API and Socket.IO
const PORT = 4001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// ✅ Register both routes
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes); // ✅ Add this
app.use('/api/profile', profileRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/help/ai-suggest', aiSuggestRoutes);
app.use('/api/execute', executeRoutes);
app.get('/api/test', (_req, res) => {
  res.send('API is working');
});

server.listen(PORT, () => {
  console.log(`✅ API + Socket.IO running at http://localhost:${PORT}`);
});
