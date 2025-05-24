import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project';
import userRoutes from './routes/user/save'; // ✅ Add this
import profileRoutes from './routes/profile';
import matchRoutes from './routes/match';
import helpRoutes from './routes/help';
import http from 'http';
import { setupSocket } from './socket';
import 'dotenv/config';

const app = express(); 
const server = http.createServer(app);
setupSocket(server);
const PORT = 4001;

app.use(cors());
app.use(express.json());

// ✅ Register both routes
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes); // ✅ Add this
app.use('/api/profile', profileRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/help', helpRoutes);

app.get('/api/test', (_req, res) => {
  res.send('API is working');
});

server.listen(4001, () => {
  console.log(`✅ API + Socket.IO running at http://localhost:4001`);
});

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});

