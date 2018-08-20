const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;

var router = express.Router();
var api = require('./api/zillow');
var convert = require('xml-js');
var states = require('./model/states');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})

app.get('/api/propertyDetails/:queryString', function (req, response, next){
  let queryString = req.params.queryString;
  console.log(queryString);
  axios.get('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + API_KEY + '&address=' + queryString + '&rentzestimate=true')
  .then(res => {
    const jsonResponse = JSON.parse(convert.xml2json(res.data, {
      compact: true,
      spaces: 4
  }))
  response.json([jsonResponse]);
})
});

app.get('/api/states', function (req,res, next){
  res.json(states);
});


module.exports = router;
