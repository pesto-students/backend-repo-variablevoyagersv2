import { config } from '@/config';
import { UserService, JWTService } from '@/services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'helga.jerde84@ethereal.email',
		pass: 'H3zTZ1Ad8tuSKxvDVp'
	}
});

// Generate a random OTP
const generateOTP = () => {
	const digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 6; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP.toString();
};

const sendOTPEmail = async (email, otp) => {
	const mailOptions = {
		from: 'Book My Venue <vadgama.mehul23@gmail.com>',
		to: email,
		subject: 'OTP for Login',
		text: `Your OTP is ${otp}`
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('OTP sent to email');

	} catch (err) {
		console.error('Error sending OTP:', err);
	}
};

export const loginOtp = async (req, res) => {
	const { email } = req.body;

	const existingEmail = await UserService.findOtpEmail(email);

	if (!existingEmail) {
		await UserService.createEmailInOtp(email);
	}

	const otp = generateOTP();

	// sendOTPEmail(email, otp);

	// Store the OTP in the database (you can use a separate table or add a new field to the user table)
	await UserService.updateOtp(email, { otp: otp });

	res.status(200).json({ message: 'OTP sent to your email' });
}

export const verifyOtp = async (req, res) => {
	const { email, otp } = req.body;

	const user = await UserService.findOtpEmail(email);

	if (!user || user.otp !== otp) {
		return res.status(401).json({ error: 'Invalid OTP' });
	}

	// Check if OTP has expired
	const currentTime = new Date();
	const expiryTime = new Date(user.expirytime);
	if (currentTime > expiryTime) {
		await UserService.removeEmailinOtp(email);
		return res.status(400).json({ error: 'OTP has expired' });
	}

	const existingUser = await UserService.findByEmail(email);
	console.log(existingUser);
	if (!existingUser) {
		await UserService.removeEmailinOtp(email);

		return res.status(200).json({
			message: 'success',
			data: { email: email, isNewUser: true },
			status: 200,
			success: true,
		});
	}
	else {
		const accessToken = JWTService.generateAccessToken(existingUser);
		const refreshToken = JWTService.generateRefreshToken(existingUser);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		});

		await UserService.removeEmailinOtp(email);

		return res.status(200).json({
			message: 'obBordingPending',
			status: 200,
			success: false,
			data: { ...existingUser, accessToken }
		});
	}
}

export const createUser = async (req, res) => {
	try {
		// const existingEmail = await UserService.findByEmail(req.body.email);
		// if (existingEmail) {
		// 	return res.status(409).json({
		// 		message: 'Email already exists',
		// 		status: 409,
		// 		success: false,
		// 	});
		// }
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

		const newUser = await UserService.create({
			...req.body,
		});

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

export const googleLogin = async (req, res) => {
	try {
		console.log(req.body);
		const existingUser = await UserService.findByEmail(req.body.email);
		if (!existingUser) {
			return res.status(200).json({
				message: 'success',
				data: { ...req.body, isNewUser: true },
				status: 200,
				success: true,
			});
		}

		else {
			const accessToken = JWTService.generateAccessToken(existingUser);
			const refreshToken = JWTService.generateRefreshToken(existingUser);
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
			});

			return res.status(200).json({
				message: 'Google Login User',
				status: 200,
				success: false,
				data: { ...existingUser, accessToken }
			});
		}

	}
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

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
