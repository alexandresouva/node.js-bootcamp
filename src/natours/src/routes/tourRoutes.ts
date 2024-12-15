import { Router } from 'express';
import {
  applyTopFiveToursQuery,
  createTour,
  deleteTour,
  getAllTours,
  getMonthlyPlanByYear,
  getTour,
  getToursStats,
  updateTour
} from '../controllers/tourController.ts';

const tourRouter = Router();

// prettier-ignore
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter.route('/stats').get(getToursStats);
tourRouter.route('/top-5').get(applyTopFiveToursQuery, getAllTours);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlanByYear);

// prettier-ignore
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourRouter;
