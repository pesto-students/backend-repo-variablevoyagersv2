import { config } from '@/config';
import { UserService, JWTService } from '@/services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const createUser = async (req, res) => {
	try {
		const existingEmail = await UserService.findByEmail(req.body.email);
		if (existingEmail) {
			return res.status(409).json({
				message: 'Email already exists',
				status: 409,
				success: false,
			});
		}
		if (req.body.phone) {
			const existingPhone = await UserService.findByPhone(req.body.phone);
			if (existingPhone) {
				return res.status(409).json({
					message: 'Phone number already exists',
					status: 409,
					success: false,
				});
			}
		}

		const hashedPassword = await UserService.hashPassword(req.body.password);
		const newUser = await UserService.create({
			...req.body,
			password: hashedPassword,
		});
		delete newUser.password;
		const accessToken = JWTService.generateAccessToken(newUser);
		const refreshToken = JWTService.generateRefreshToken(newUser);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		});
		return res.status(201).json({
			message: 'success',
			data: { ...newUser, accessToken },
			status: 201,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Finding the user by email and verifying the password
		const user = await UserService.findByCredentials(email, password);

		if (!user) {
			return res.status(401).json({
				message: 'Invalid email or password',
				status: 401,
				success: false,
			});
		}
		delete user.password;
		const accessToken = JWTService.generateAccessToken(user);
		const refreshToken = JWTService.generateRefreshToken(user);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		});
		res.status(200).json({
			message: 'Login successful',
			status: 200,
			success: true,
			data: { ...user, accessToken },
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
export const logoutUser = async (req, res) => {
	const options = {
		httpOnly: true,
		secure: true,
	};

	return res.status(200).clearCookie('refreshToken', options).json({
		message: 'User logged Out',
		status: 200,
		success: true,
		data: {},
	});
};
export const refreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.refreshToken) {
		return res.sendStatus(400).json({
			message: 'Refresh token not found',
			status: 'error',
		});
	}
	const refreshToken = cookies.refreshToken;
	jwt.verify(refreshToken, config.TOKEN.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403).json({
				message: 'Unauthorized',
				status: 'error',
			});
		}
		const { iat, ...restUser } = user;
		const accessToken = JWTService.generateAccessToken(restUser);
		res.json({ accessToken });
	});
};

export const changePassword = async (req, res) => {
	const { id, oldPassword, newPassword } = req.body;
	if (!id || !oldPassword || !newPassword) {
		return res.status(400).json({
			message: 'Required field missing',
			status: 400,
			success: false,
		});
	}
	const user = await UserService.findById(id);

	if (!user) {
		return res.status(400).json({
			message: 'User not found',
			status: 400,
			success: false,
		});
	}
	console.log(user);
	const { password } = user;
	const compare = await bcrypt.compare(oldPassword, password);
	if (!compare) {
		return res.status(400).json({
			message: 'Incorrect Password',
			status: 400,
			success: false,
		});
	}
	const hashedPassword = await UserService.hashPassword(newPassword);
	const result = await UserService.updatePassword(id, hashedPassword);
	console.log(result);
	if (!result) {
		return res.status(400).json({
			message: 'Password Changed Failed',
			status: 400,
			success: false,
		});
	}
	delete result.password;
	return res.status(200).json({
		message: 'Success',
		status: 200,
		success: true,
		data: { ...result },
	});
};
