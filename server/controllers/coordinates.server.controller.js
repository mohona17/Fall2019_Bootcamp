var config = require('../config/config'),
  request = require('request');
  //NodeGeocoder = require('node-geocoder');

module.exports = function (req, res, next) {
  if (req.body.address) {
    //This code just formats the address so that it doesn't have space and commas using escape characters
    var addressTemp = req.body.address;
    var addressTemp2 = addressTemp.toLowerCase();
    var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
    var addressTemp4 = addressTemp3.replace(/,/g, "%2C");

    //Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read 
    var options = {
      q: addressTemp4,
      key: config.openCage.key,
    }
    var api_url = 'https://api.opencagedata.com/geocode/v1/json';
    //console.log(options.key)
    var request_url = api_url + '?' + '&q=' + options.q + '&key=' + options.key + '&pretty=1' + '&no_annotations=1';
    //Example: https://api.opencagedata.com/geocode/v1/json?q=University+of+florida&key=63d2cb9196c7448b814c7f366e2113a9&pretty=1&no_annotations=1

    //Setup your request using URL and options - see ? for format
    // request({
    //   url: 'https://api.opencagedata.com/geocode/v1/json',
    //   qs: options
    //}, 
    request(request_url, function (error, response, body) {
      //For ideas about response and error processing see https://opencagedata.com/tutorials/geocode-in-nodejs

      //ALTERNATIVE WAY USING API 
      /*var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: options.key,
        formatterPattern: 'string'
      });
      
      // Using callback
      geocoder.geocode(options.q, function(err, res) {
        //prints latitude
        //console.log(res[0].latitude);

        req.results = {
          latitude:res[0].latitude, 
          longitude: res[0].longitude
        }
        res.send(req.results);
        console.log("yo"+req.results.latitude);
      });*/

      if (error) throw error; 
      // //JSON.parse to get contents. Remember to look at the response's JSON format in open cage data
      var data = JSON.parse(body);

      //prints out latitude
      console.log(data.results[0].geometry.lat);
      console.log(data.results[0].geometry.lng);

      /*Save the coordinates in req.results -> 
        this information will be accessed by listings.server.model.js 
        to add the coordinates to the listing request to be saved to the database.
        Assumption: if we get a result we will take the coordinates from the first result returned
      */
      //  req.results = stores you coordinates
      req.results = {
        latitude: data.results[0].geometry.lat,
        longitude: data.results[0].geometry.lng
      }



      next();
    });
  } else {
    next();
  }
};  