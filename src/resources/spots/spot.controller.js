const crudControllers = require('../crud');
const FavoriteSpot = require('./spot.model');
const validation = require('./spot.validation');

module.exports = crudControllers(FavoriteSpot, validation);
