import express from 'express';
import { json } from 'body-parser';
import { config } from '@/config';
import { propertyRouter, userRouter } from '@/routes';

const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/property', propertyRouter);

app.listen(config.SERVER.PORT, () => {
  console.log(`Server listening on port ${config.SERVER.PORT}`);
});
