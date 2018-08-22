var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  propertyTax: Number
}, {collection: 'State'});

module.exports = mongoose.model('State', stateSchema, "state");
