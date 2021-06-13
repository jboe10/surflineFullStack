const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('./userAuth.model');
const UserInfo = require('../resources/users/user.model');
const jwt = require('jsonwebtoken');
const validation = require('./userAuth.validation');
const userInfoValidation = require('../resources/users/user.validation');
const { restart } = require('nodemon');

router.post('/register', async (req, res) => {
	// VALIDATE DATA BEFORE SAVING USER
	const { error } = validation.registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// CHECK IF USER EMAIL IS IN DB
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) return res.status(400).send('Email already exists');

	// HASH THE PASS
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// CREATE NEW USER
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});

	try {
		// CREATE USER
		const savedUser = await user.save();

		// CREATE USERINFO based off user
		const userInfoObj = {
			id: `${savedUser._id}`,
		};

		// Validate USERINFO
		const { error } = userInfoValidation.createValidation(userInfoObj);
		if (error) {
			// remove USER created
			user.deleteOne({ _id: savedUser._id });
			return res.status(400).send(error.details[0].message);
		}

		const userInfo = new UserInfo(userInfoObj);
		const savedInfo = await userInfo.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	// VALIDATE DATA BEFORE SAVING USER
	const { error } = validation.loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// CHECK IF USER IS IN DB
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email or pass incorrect');

	//PASSWORD IS CORRECT
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('invalid pass');

	//CREATE AND ASSIGN A TOKEN
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(JSON.stringify({ token: token }));
});

module.exports = router;
