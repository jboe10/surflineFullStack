const Joi = require('@hapi/joi');

const createValidation = data => {
	const schema = Joi.object({
		countyRegion: Joi.string().required(),
		country: Joi.string(),
		state: Joi.string(),
		spots: Joi.array(),
	});
	return schema.validate(data);
};

const updateValidation = data => {
	const schema = Joi.object({
		countyRegion: Joi.string(),
		country: Joi.string(),
		state: Joi.string(),
		spots: Joi.array(),
	});
	return schema.validate(data);
};

module.exports = {
	createValidation,
	updateValidation,
};
