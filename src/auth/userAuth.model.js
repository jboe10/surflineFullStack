const { array } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
		min: 6,
	},
	email: {
		required: true,
		type: String,
		max: 255,
	},
	password: {
		required: true,
		type: String,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('user', userSchema);
