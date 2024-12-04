import express from 'express';
import morgan from 'morgan';
import path from 'path';
import tourRouter from './routes/tourRoutes.ts';
import userRouter from './routes/userRoutes.ts';

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, '../public')));

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
