import express from 'express';
import userRouter from './user.routes';
import propertyRouter from './property.routes';
import reviewRouter from './review.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/review',reviewRouter)

export default router;
