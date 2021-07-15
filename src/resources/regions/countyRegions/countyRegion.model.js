const mongoose = require('mongoose');

const CountyRegionSchema = new mongoose.Schema({
	countyRegion: {
		type: String,
		required: true,
		min: 2,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'country',
	},
	state: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'state',
	},
	spots: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'spot',
		},
	],
});

module.exports = mongoose.model('countyRegion', CountyRegionSchema);
