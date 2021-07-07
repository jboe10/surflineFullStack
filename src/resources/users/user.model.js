const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		min: 4,
	},
	favoriteSpots: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'spot',
		},
	],
});

module.exports = mongoose.model('userinfo', UserInfoSchema);
