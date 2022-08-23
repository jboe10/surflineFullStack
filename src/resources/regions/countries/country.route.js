const express = require('express');
const controllers = require('./country.controller');
const router = express.Router();

router.route('/').post(controllers.createOne).get(controllers.getMany);

router
	.route('/:id')
	.get(controllers.getOneAndPopulate)
	.put(controllers.updateOne);

module.exports = router;
