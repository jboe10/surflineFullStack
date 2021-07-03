const express = require('express');
const controllers = require('./user.controller');
const router = express.Router();
const verify = require('../verifyToken');

router
	.use(verify.tokenAuth)
	.route('/')
	.put(controllers.updateOnePrime)
	.get(controllers.getOneAndPopulateSpot)
	.delete(controllers.removeOnePrime);

module.exports = router;
