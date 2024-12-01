import { Tour } from '../../schemas/tourSchema.js';

declare global {
  namespace Express {
    interface Request {
      // TODO: Adjust type of tour
      tour?: Tour;
    }
  }
}
