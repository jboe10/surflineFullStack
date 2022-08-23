const crudControllers = require('../../crud');
const countyRegionModel = require('./countyRegion.model');
const validation = require('./countyRegion.validation');

const state = 'state';
const spot = 'spot';
const country = 'country';

const getOneAndPopulate = model => async (req, res) => {
	try {
		const id = req.params.id;

		const doc = await model
			.findOne({ _id: id })
			.lean()
			.populate(state)
			.populate(spot)
			.populate(country)
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

module.exports = crudControllers(countyRegionModel, validation);
module.exports.getOneAndPopulate = getOneAndPopulate(countyRegionModel);
