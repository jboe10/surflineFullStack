const Joi = require('@hapi/joi');

const createValidation = data => {
	const schema = Joi.object({
		country: Joi.string().required(),
		states: Joi.array(),
	});
	return schema.validate(data);
};

const updateValidation = data => {
	const schema = Joi.object({
		country: Joi.string(),
		states: Joi.array(),
	});
	return schema.validate(data);
};

module.exports = {
	createValidation,
	updateValidation,
};
