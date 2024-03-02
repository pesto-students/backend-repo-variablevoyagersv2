import Joi from 'joi';

export const validateCreateUser = (req, res, next) => {
	const userRegistrationSchema = Joi.object({
		email: Joi.string().email().required(),
		firstName: Joi.string().allow(null, ''),
		lastName: Joi.string().allow(null, ''),
		password: Joi.string().required(),
		phone: Joi.string()
			.allow(null, '')
			.pattern(/^[0-9]{10,}$/),
		role: Joi.string().valid('CUSTOMER', 'OWNER').required(),
	});

	const { error } = userRegistrationSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

export const validateLogin = (req, res, next) => {
	userLoginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error } = userLoginSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details });
	}
	next();
};
