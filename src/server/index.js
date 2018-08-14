const express = require('express');
const axios = require('axios');
const os = require('os');
require('dotenv').config();
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const app = express();
const PORT = process.env.PORT || 8080;
var router = express.Router();
var api = require('./api/zillow');

app.use(express.static('dist'));
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})

router.get('/api/propertyDetails', api.getZillowPropertyDetails);


module.exports = router;
