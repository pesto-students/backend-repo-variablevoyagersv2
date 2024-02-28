import { Router } from 'express';
import { ReviewController } from '@/controllers';

const reviewRouter = Router();

reviewRouter.post('/', ReviewController.createReview);
// propertyRouter.get('/:id', PropertyController.getPropertyById);
// propertyRouter.put('/:id', PropertyController.updateProperty);
// propertyRouter.delete('/:id', PropertyController.deleteProperty);

export default reviewRouter;
