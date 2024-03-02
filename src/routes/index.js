import express from 'express';
import userRouter from './user.routes';
import propertyRouter from './property.routes';
import reviewRouter from './review.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/review', reviewRouter);

export default router;
