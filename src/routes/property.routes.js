import { Router } from 'express';
import { PropertyController } from '@/controllers';

const propertyRouter = Router();


propertyRouter.post('/', PropertyController.createProperty);


export default propertyRouter;
