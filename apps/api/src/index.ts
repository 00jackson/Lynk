// apps/api/src/index.ts
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user/save';
import updateUser from './routes/user/save';
import projectRoutes from './routes/project';
import 'dotenv/config';


const app = express();

app.use(cors());
app.use(express.json());

// use the router, not a direct async function
app.use('/api/user', userRouter);
app.use('/api/user/update',updateUser)
app.use('/api/project', projectRoutes);

app.listen(4001, () => console.log('API running at http://localhost:4001'));