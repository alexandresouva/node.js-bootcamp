import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.ts';
import userRouter from './routes/userRoutes.ts';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
