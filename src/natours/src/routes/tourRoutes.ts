import { Router } from 'express';
import {
  applyTopFiveToursQuery,
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour
} from '../controllers/tourController.ts';

const tourRouter = Router();
tourRouter.route('/top-5').get(applyTopFiveToursQuery, getAllTours);

// prettier-ignore
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

// prettier-ignore
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourRouter;
