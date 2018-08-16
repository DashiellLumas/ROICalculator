  const axios = require('axios');
  const Promise = require('bluebird');
  var convert = require('xml-js');

getZillowPropertyDetails = (req,res) => {
  console.log("this is res");

  const queryString = '2114+Bigelow+Ave&citystatezip=Seattle%2C+WA';
  const zillowPropertyDetails = '';
  axios.get(zillowPropertyDetails).then((response) => {
    let responseJson = convert.xml2json(response.data, {compact: true, spaces: 4});
    console.log(responseJson);

  })
  .then((res) =>{
  })
  .catch((error) => {
    console.log(error);
  })
}

module.exports = {
  getZillowPropertyDetails: getZillowPropertyDetails,
};
