const Joi = require('@hapi/joi');

const createValidation = data => {
	const schema = Joi.object({
		id: Joi.string().required(),
		favoriteSpots: Joi.array(),
	});
	return schema.validate(data);
};

const updateValidation = data => {
	const schema = Joi.object({
		favoriteSpots: Joi.array(),
	});
	return schema.validate(data);
};

module.exports.updateValidation = updateValidation;
module.exports.createValidation = createValidation;
