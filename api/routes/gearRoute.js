const gearRoute = require('express').Router();
const bikes = '../controller/bikes.js';

console.log('gear.get', gear.get)

gearRoute.get('/bikes', bikes.get);

module.exports = gearRoute;