import { Tour } from '../../schemas/tourSchema.ts';

declare global {
  namespace Express {
    interface Request {
      tour?: Tour;
    }
  }
}
