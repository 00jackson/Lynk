import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project';
import userRoutes from './routes/user/save'; // ✅ Add this
import profileRoutes from './routes/profile';
import 'dotenv/config';

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

// ✅ Register both routes
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes); // ✅ Add this
app.use('/api/profile', profileRoutes);


app.get('/api/test', (_req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});

