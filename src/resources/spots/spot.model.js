const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		min: 4,
	},
	quality: {
		type: String,
		require: true,
		min: 4,
	},
	size: {
		type: String,
		require: true,
		min: 3,
	},
});

module.exports = mongoose.model('spot', SpotSchema);
