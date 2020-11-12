// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv')
// const cors = require('cors');
// const morgan = require('morgan');
// const {json, urlencoded} = require('body-parser');
// const port =  process.env.PORT || 5000;
// dotenv.config();

// // import Routes
// const usersRoute = require('../src/resources/users/user.route');
// const spotsRoute = require('../src/resources/spots/spot.route');

// // connect to db
// const uri = "mongodb+srv://jboe:kino1212@cluster0.9hnwg.mongodb.net/srfline?retryWrites=true&w=majority";
// const connect = () => {
//   return mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
// }

// // middleware 
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));
// app.use(urlencoded({extended: true}));

// // route middlewares
// app.use('/api/user', usersRoute);
// app.use('/api/spots/', spotsRoute);

// connect()
// .then(async connnection => {
//   // start express server
//   app.listen(port);
// })
// .catch (e => console.error(e))
