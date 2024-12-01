import { Tour } from '../../schemas/tourSchema.ts';

declare global {
  namespace Express {
    interface Request {
      // TODO: Adjust type of tour
      tour?: Tour;
    }
  }
}
