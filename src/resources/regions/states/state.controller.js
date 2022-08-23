const crudControllers = require('../../crud');
const stateModel = require('./state.model');
const validation = require('./state.validation');

const country = 'country';
const countyRegion = 'countryRegion';

const getOneAndPopulate = model => async (req, res) => {
	try {
		const id = req.params.id;

		const doc = await model
			.findOne({ _id: id })
			.lean()
			.populate(country)
			.populate(countyRegion)
			.exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

module.exports = crudControllers(stateModel, validation);
module.exports.getOneAndPopulate = getOneAndPopulate(stateModel);
