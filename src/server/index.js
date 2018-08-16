const express = require('express');
const axios = require('axios');
const os = require('os');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
const queryString = '1052+Helen+St&citystatezip=Detroit%2C+MI';
var router = express.Router();
var api = require('./api/zillow');
var convert = require('xml-js');

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})

app.get('/api/propertyDetails', function (req, response, next){
  let queryString = req.body;
  console.log(queryString);
//   axios.get('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + API_KEY + '&address=' + queryString + '&rentzestimate=true')
//   .then(res => {
//     const jsonResponse = JSON.parse(convert.xml2json(res.data, {
//       compact: true,
//       spaces: 4
//   }))
//   response.json([jsonResponse]);
// })
});

module.exports = router;
