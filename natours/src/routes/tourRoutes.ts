import { Router } from 'express';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from '../controllers/tourController.js';

const tourRouter = Router();

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
