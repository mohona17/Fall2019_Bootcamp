'use strict';
/* 
  Import modules/files you may need to correctly run the script.  */

var fs = require('fs'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Listing = require('./ListingSchema.js'),  //returns model
  listingData,
  config = require('./config');// Make sure to save your DB's uri in the config file, then import it with a require statement!

/* Connect to your database using mongoose - remember to keep your key secret*/

mongoose.connect(config.db.uri, { useNewUrlParser: true ,useUnifiedTopology:true});

//Creating a document for DB. Listing is the model instantiated in ListingSchema.js
Listing.createCollection(); 

//Read File ------------------------------------------
fs.readFile('listings.json', 'utf8', function(err, data) {
  
  if (err) throw err;

  //Parse JSON
  listingData = data; //save the data in the listingData variable, 
  let parseddata = JSON.parse(listingData);
  //console.log(parseddata);

  //Saves the parsed data in the collection of the mongoose model instantiated before 
  //Listing.collection.save(parseddata); this is deprecated
  Listing.collection.insertOne(parseddata);
}); 
