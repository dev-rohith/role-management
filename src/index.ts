import express from 'express';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
