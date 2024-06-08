import express from 'express';
import { json } from 'body-parser';
import { config } from '@/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '@/routes';
import { filterDeleted } from './middlewares/filterDeleted.middleware ';
import './services/bookingCron.service';
const app = express();

const corsOptions = {
	origin: config.SERVER.ORIGINS,
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
	credentials: true, // Enable credentials (cookies, authorization headers, etc)
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.get('/', (req, res) => {
	console.log('object');
	res.status(200).json({
		message: 'success',
		status: 200,
		success: true,
	});
});
app.use(filterDeleted);
app.use(config.API_VERSION_URL, router);

app.listen(config.SERVER.PORT, () => {
	console.log(`Server listening on port ${config.SERVER.PORT}`);
});
