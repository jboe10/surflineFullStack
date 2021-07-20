const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const path = require('path');
const controllers = require('./resources/spots/spot.controller');

// import Routes
const authRoute = require('./auth/userAuth.route');
const usersRoute = require('./resources/users/user.route');
const spotsRoute = require('./resources/spots/spot.route');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/spots/', spotsRoute);
app.get('/test', (req, res) => {
	res.sendStatus(200);
});

app.use('/static', express.static(path.join(__dirname, 'build')));
// app.use(express.static('build'));
//set static folder
app.get('*', (req, res) => {
	// res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
	const index = path.join(__dirname, 'build', 'index.html');
	res.sendFile(index);
});

module.exports = app;
