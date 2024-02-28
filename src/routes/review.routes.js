import { Router } from 'express';
import { ReviewController } from '@/controllers';

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.get('/:id', ReviewController.getReviewById);
reviewRouter.put('/:id', ReviewController.updateReview);
reviewRouter.delete('/:id', ReviewController.deleteReview);
// reviewRouter.post('/e', ReviewController.existreview);

export default reviewRouter;
