const crudControllers = require('../crud');
const FavoriteSpot = require('./spot.model');

module.exports = crudControllers(FavoriteSpot);
