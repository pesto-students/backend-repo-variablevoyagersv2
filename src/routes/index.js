import express from 'express';
import userRouter from './user.routes';
import propertyRouter from './property.routes';
import reviewRouter from './review.routes';
import propertyTagsRouter from './propertyTags.routes';
import tagRouter from './tag.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/review',  reviewRouter);
router.use('/propertytags', propertyTagsRouter)
router.use('/tag', tagRouter)

export default router;
