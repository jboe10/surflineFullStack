const Joi = require('@hapi/joi');

const createValidation = data => {
	const schema = Joi.object({
		name: Joi.string().required(),
		quality: Joi.string().required(),
		size: Joi.string().required(),
	});
	return schema.validate(data);
};

const updateValidation = data => {
	const schema = Joi.object({
		name: Joi.string(),
		quality: Joi.string(),
		size: Joi.string(),
	});
	return schema.validate(data);
};

module.exports = { createValidation, updateValidation };
