const crudControllers = require('../../crud');
const countryModel = require('./country.model');
const validation = require('./country.validation');

const state = 'state';

const getOneAndPopulate = model => async (req, res) => {
	try {
		const id = req.params.id;

		const doc = await model.findOne({ _id: id }).lean().populate(state).exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

module.exports = crudControllers(countryModel, validation);
module.exports.getOneAndPopulate = getOneAndPopulate(countryModel);
