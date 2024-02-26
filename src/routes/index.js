import express from 'express';
import userRouter from './user.routes';
import propertyRouter from './property.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/property', propertyRouter);

export default router;
