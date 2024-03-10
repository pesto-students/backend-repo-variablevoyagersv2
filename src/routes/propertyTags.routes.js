import { PropertyTagsController } from '@/controllers';
import { Router } from 'express';

const propertyTagsRouter = Router();

propertyTagsRouter.post('/', PropertyTagsController.createPropertyTags);

export default propertyTagsRouter;
