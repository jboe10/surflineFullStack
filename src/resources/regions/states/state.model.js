const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
	state: {
		type: String,
		required: true,
		min: 2,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'country',
	},
	countyRegions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'countyRegion',
		},
	],
});

module.exports = mongoose.model('state', StateSchema);
