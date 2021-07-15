const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
	country: {
		type: String,
		required: true,
		min: 2,
	},
	states: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'state',
		},
	],
});

module.exports = mongoose.model('country', CountrySchema);
