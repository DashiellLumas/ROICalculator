var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  propertyTax: Number
});

module.exports = mongoose.model('State', stateSchema, "state");
