const Joi = require('@hapi/joi');

const createValidation = data => {
	const schema = Joi.object({
		state: Joi.string().required(),
		country: Joi.string(),
		countyRegions: Joi.array(),
	});
	return schema.validate(data);
};

const updateValidation = data => {
	const schema = Joi.object({
		state: Joi.string(),
		country: Joi.string(),
		countyRegions: Joi.array(),
	});
	return schema.validate(data);
};

module.exports = {
	createValidation,
	updateValidation,
};
