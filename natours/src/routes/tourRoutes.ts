import { Router } from 'express';
import {
  verifyTourExists,
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  validateTourSchema,
} from '../controllers/tourController.ts';

const tourRouter = Router();
tourRouter.param('id', validateTourSchema);
tourRouter.param('id', verifyTourExists);

// prettier-ignore
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

// prettier-ignore
tourRouter.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourRouter;
