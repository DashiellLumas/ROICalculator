const express = require('express');
var cors = require('cors');
const axios = require('axios');
var mongoose = require('mongoose');
require('dotenv').config();
const CONNECTIONSTRING = process.env.CONNECTIONSTRING;
mongoose.connect(CONNECTIONSTRING, function(err, database) {
  if (err)
    throw err;
  else {
    db = database;
    console.log('Connected to mongoDB');
  }
}).then(() => console.log('connection successful')).catch((err) => console.log(err));
mongoose.Promise = global.Promise;



var Db = require('mongodb').Db;
var Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const Server = require('mongodb').Server;

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8083;
const API_KEY = process.env.REACT_APP_ZILLOW_API_KEY;
var router = express.Router();
var api = require('./api/zillow');
var convert = require('xml-js');
var State = require('./model/States.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('dist'));
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
  State.find(function (err, states) {
    if (err) {
      return next(err);
    } else{
          res.json(states);
    }

  })
});


module.exports = router;
