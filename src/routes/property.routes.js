import { Router } from 'express';
import { PropertyController } from '@/controllers';

const propertyRouter = Router();

propertyRouter.post('/', PropertyController.createProperty);
propertyRouter.get('/:id', PropertyController.getPropertyById);
propertyRouter.put('/:id', PropertyController.updateProperty);
propertyRouter.delete('/:id', PropertyController.deleteProperty);

export default propertyRouter;
