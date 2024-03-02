import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
	API_VERSION_URL: '/api/v1',

	SERVER: {
		PORT: process.env.SERVER_PORT,
	},
	TOKEN: {
		ACCESSTOKEN: process.env.ACCESS_TOKEN,
	},
	SALT: process.env.SALT,
	IMAGEKIT: {
		IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
		IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
		IMAGEKIT_URL: process.env.IMAGEKIT_URL,
	},
};
