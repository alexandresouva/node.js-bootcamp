import { Router } from 'express';
import {
  verifyTourExists,
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  validateTourBody,
  validateTourId
} from '../controllers/tourController.ts';

const tourRouter = Router();
tourRouter.param('id', validateTourId);
tourRouter.param('id', verifyTourExists);

// prettier-ignore
tourRouter
  .route('/')
  .get(getAllTours)
  .post(validateTourBody, createTour);

// prettier-ignore
tourRouter.route('/:id')
  .get(getTour)
  .patch(validateTourBody, updateTour)
  .delete(deleteTour);

export default tourRouter;
