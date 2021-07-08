const crudControllers = require('../crud');
const User = require('./user.model');

const getOneAndPopulate = populate => async (req, res) => {
	try {
		// should add option to pass in populate
		const id = req.user;
		let doc;
		if (populate) {
			doc = await User.findOne({ id: id }).lean().populate(populate).exec();
		} else {
			doc = await User.findOne({ id: id }).lean().exec();
		}

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

module.exports = crudControllers(User);
module.exports.getOneAndPopulateSpot = getOneAndPopulate('favoriteSpots');
