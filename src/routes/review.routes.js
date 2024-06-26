import { Router } from 'express';
import { ReviewController } from '@/controllers';
import { AuthMiddleware } from '@/middlewares';

const reviewRouter = Router();

reviewRouter.post(
  '/',
  AuthMiddleware.verifyToken,
  ReviewController.createReview
);
reviewRouter.get(
  '/:id',
  AuthMiddleware.verifyToken,
  ReviewController.getReviewById
);
reviewRouter.put(
  '/:id',
  AuthMiddleware.verifyToken,
  ReviewController.updateReview
);
reviewRouter.delete(
  '/:id',
  AuthMiddleware.verifyToken,
  ReviewController.deleteReview
);

export default reviewRouter;
