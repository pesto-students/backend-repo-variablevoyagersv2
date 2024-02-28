import Joi from 'joi'


// Validation schema for user registration
export const userRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().allow(null, ''),
    lastName: Joi.string().allow(null, ''),
    password: Joi.string().required(),
    phone: Joi.string().allow(null, '').pattern(/^[0-9]{10,}$/),
    role: Joi.string().valid('CUSTOMER', 'OWNER').required(),
});

// Validation schema for user login
export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});