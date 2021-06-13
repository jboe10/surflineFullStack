const express = require('express');
const controllers = require('./spot.controller');
const router = express.Router();
// const auth = require('./auth.middleware');

router.route('/').get(controllers.getMany).post(controllers.createOne);

router.route('/:id')
	.get(controllers.getOne)
	.put(controllers.updateOne)
	.delete(controllers.removeOne);

module.exports = router;
