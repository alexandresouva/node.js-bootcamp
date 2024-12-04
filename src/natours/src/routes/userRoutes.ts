import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '../controllers/userController.ts';

const userRouter = Router();

// prettier-ignore
userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

// prettier-ignore
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
