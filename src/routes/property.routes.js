import { Router } from 'express';
import { PropertyController } from '@/controllers';
import { MulterMiddleware, PropertyMiddleware } from '@/middlewares';

const propertyRouter = Router();

propertyRouter.post(
	'/',
	// PropertyMiddleware.validateCreateProperty,
	MulterMiddleware.upload.array('propertyImages', 5),
	PropertyController.createProperty,
);
propertyRouter.get('/:id', PropertyController.getPropertyById);
propertyRouter.put('/:id', PropertyController.updateProperty);
propertyRouter.delete('/:id', PropertyController.deleteProperty);

export default propertyRouter;
