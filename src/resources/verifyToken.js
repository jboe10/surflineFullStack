const { required } = require('@hapi/joi');

const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('access denied');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified._id;
		next();
	} catch (err) {
		res.state(400).send('INVALID TOKEN');
	}
};

module.exports = { tokenAuth };
