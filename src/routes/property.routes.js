import { Router } from 'express';
import { PropertyController } from '@/controllers';
import { AuthMiddleware, MulterMiddleware, PropertyMiddleware } from '@/middlewares';

const propertyRouter = Router();

propertyRouter.post(
	'/',
	// PropertyMiddleware.validateCreateProperty,
	MulterMiddleware.upload.array('propertyImages', 5),
	PropertyController.createProperty,
);
propertyRouter.get('/owner-property/:id', AuthMiddleware.verifyToken, PropertyController.getAllOwnerProperty);
propertyRouter.get('/', PropertyController.getProperties);
propertyRouter.get('/:id', PropertyController.getPropertyById);
propertyRouter.put('/:id', PropertyController.updateProperty);
propertyRouter.delete('/:id', PropertyController.deleteProperty);

export default propertyRouter;
