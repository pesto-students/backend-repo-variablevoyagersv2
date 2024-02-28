import { Router } from 'express';
import { ReviewController } from '@/controllers';

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.put('/:id', ReviewController.updateReview);
reviewRouter.delete('/:id', ReviewController.deleteReview);


export default reviewRouter;
