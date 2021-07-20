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
app.use(express.static(path.join(__dirname, '../client/build')));

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

//set static folder
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
