import express from 'express';
import { json } from 'body-parser';
import { config } from '@/config';
import cors from 'cors';

import router from '@/routes';

const app = express();

app.use(json());

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'success',
		status: 200,
		success: true,
	});
});

app.use(config.API_VERSION_URL, router);

app.listen(config.SERVER.PORT, () => {
	console.log(`Server listening on port ${config.SERVER.PORT}`);
});
