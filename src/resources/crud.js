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

const updateOne =
	(model, validation = null) =>
	async (req, res) => {
		try {
			const id = req.params.id;
			const body = req.body;

			// validate data in put if validation available
			if (validation.updateValidation) {
				const { error } = validation.updateValidation(body);
				if (error) {
					return res.status(400).end();
				}
			}

			const updatedDoc = await model
				.findOneAndUpdate(
					{
						_id: id,
					},
					req.body,
					{ new: true }
				)
				.lean()
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

const createOne =
	(model, validation = null) =>
	async (req, res) => {
		try {
			const body = req.body;

			// validate post
			if (validation.createValidation) {
				const { error } = validation.createValidation(body);
				if (error) {
					return res.status(400).end();
				}
			}

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

module.exports = (model, validation = null) => ({
	removeOne: removeOne(model),
	updateOne: updateOne(model, validation),
	getMany: getMany(model),
	getOne: getOne(model),
	createOne: createOne(model, validation),
	getOnePrime: getOnePrime(model),
	updateOnePrime: updateOnePrime(model),
	removeOnePrime: removeOnePrime(model),
});
