import { config } from '@/config';
import jwt from 'jsonwebtoken';

// Generate access token
export const generateAccessToken = (user) => {
	return jwt.sign(user, config.TOKEN.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
};

// Generate refresh token
export const generateRefreshToken = (user) => {
	return jwt.sign(user, config.TOKEN.REFRESH_TOKEN_SECRET);
};
