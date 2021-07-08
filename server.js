const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

// connect to db
// const uri =
// 	'mongodb+srv://jboe:kino1212@cluster0.9hnwg.mongodb.net/srfline?retryWrites=true&w=majority';
const uri = 'mongodb://localhost:27017/JWT';

const connect = () => {
	return mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

// create port
const port = process.env.PORT || 4000;

connect()
	.then(async connnection => {
		// start express server
		app.listen(port);
	})
	.catch(e => console.error(e));
