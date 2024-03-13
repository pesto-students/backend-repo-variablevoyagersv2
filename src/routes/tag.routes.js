import {  TagController } from '@/controllers';
import { Router } from 'express';

const tagRouter = Router();

tagRouter.post('/', TagController.createTag);
tagRouter.get('/:id', TagController.getTagById);
tagRouter.delete('/:id', TagController.deleteTag);

export default tagRouter;
