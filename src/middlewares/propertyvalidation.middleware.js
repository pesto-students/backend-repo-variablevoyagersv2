import Joi from 'joi';

export const validateCreateProperty = (req, res, next) => {
	console.log(req.body);
	const propertySchema = Joi.object({
		propertyName: Joi.string().required(),
		description: Joi.string().required(),
		capacity: Joi.string().required(),
		address: Joi.string().required(),
		city: Joi.string().required(),
		country: Joi.string().required(),
		pincode: Joi.string().allow('').optional(),
		lat: Joi.string().allow('').optional(),
		lng: Joi.string().allow('').optional(),
		ownerId: Joi.string().required(),
		propertyImages: Joi.array()
			.items(
				Joi.object({
					img: Joi.binary().required(),
					caption: Joi.string().optional(),
				}),
			)
			.required(),
	});

	const { error } = propertySchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};
