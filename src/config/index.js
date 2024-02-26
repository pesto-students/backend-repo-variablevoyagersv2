import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  SERVER: {
    PORT: process.env.SERVER_PORT,
  },
  TOKEN: {
    ACCESSTOKEN: process.env.ACCESS_TOKEN,
  },
  SALT:process.env.SALT
};
