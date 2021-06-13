const getOne = model => async (req, res) => {
	try {
		// should add option to pass in populate
		const id = req.params.id;
		const doc = await model.findOne({ _id: id }).lean().exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const getOnePrime = model => async (req, res) => {
	try {
		// should add option to pass in populate
		const id = req.params.id;
		const doc = await model.findOne({ id: id }).lean().exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const getMany = model => async (req, res) => {
	try {
		// should add option to pass in populate
		const doc = await model.find({}).lean().exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const removeOne = model => async (req, res) => {
	try {
		const id = req.params.id;
		const removed = await model.findOneAndRemove({
			_id: id,
		});

		if (!removed) {
			return res.status(400).end();
		}

		res.status(200).json(removed);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const removeOnePrime = model => async (req, res) => {
	try {
		const id = req.params.id;
		const removed = await model.findOneAndRemove({
			id: id,
		});

		if (!removed) {
			return res.status(400).end();
		}

		res.status(200).json(removed);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const updateOne = model => async (req, res) => {
	try {
		const id = req.params.id;
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					_id: id,
				},
				req.body,
				{ new: true }
			)
			.lean()
			// .populate('classes')
			.exec();

		if (!updatedDoc) {
			return res.status(400).end();
		}

		res.status(200).json(updatedDoc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};
const updateOnePrime = model => async (req, res) => {
	try {
		const id = req.user;
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					id: id,
				},
				req.body,
				{ new: true }
			)
			.lean()
			// .populate('classes')
			.exec();

		if (!updatedDoc) {
			return res.status(400).end();
		}

		res.status(200).json(updatedDoc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const updateOneByEmail = model => async (req, res) => {
	try {
		const email = req.body.email;
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					email: email,
				},
				req.body,
				{ new: true }
			)
			.lean()
			// .populate('classes')
			.exec();

		if (!updatedDoc) {
			return res.status(400).end();
		}

		res.status(200).json(updatedDoc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const createOne = model => async (req, res) => {
	try {
		const body = req.body;
		const doc = await model.create({ ...body });

		if (!doc) {
			return res.status(400).end();
		}

		res.status(201).json(doc);
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

module.exports = model => ({
	removeOne: removeOne(model),
	updateOne: updateOne(model),
	getMany: getMany(model),
	getOne: getOne(model),
	createOne: createOne(model),
	updateOneByEmail: updateOneByEmail(model),
	getOnePrime: getOnePrime(model),
	updateOnePrime: updateOnePrime(model),
	removeOnePrime: removeOnePrime(model),
});

module.exports.removeOne = model => ({ removeOne: removeOne(model) });
module.exports.updateOne = model => ({ updateOne: updateOne(model) });
module.exports.getMany = model => ({ getMany: getMany(model) });
module.exports.getOne = model => ({ getOne: getOne(model) });
module.exports.createOne = model => ({ createOne: createOne(model) });
module.exports.updateOneByEmail = model => ({
	updateOneByEmail: updateOneByEmail(model),
});
module.exports.getOnePrime = model => ({ getOnePrime: getOnePrime(model) });
module.exports.updateOnePrime = model => ({
	updateOnePrime: updateOnePrime(model),
});
module.exports.removeOnePrime = model => ({
	removeOnePrime: removeOnePrime(model),
});
