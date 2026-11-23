import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import tradesRoutes from './routes/trades';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/trades', tradesRoutes);

app.use(errorHandler);

export default app;
