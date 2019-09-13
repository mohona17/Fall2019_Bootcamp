/* Add all the required libraries*/
var mongoose = require('mongoose'),
  config = require('./config'),
  Listing = require('./ListingSchema.js'); //this is the model 
/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, { useNewUrlParser: true ,useUnifiedTopology:true});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

  Listing.collection.findOne({code:"LBW", name: "Library West"},function(err,LibWest){
      if (err) throw err;
      console.log(LibWest);
  });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

  Listing.collection.findOneAndDelete({code:"CABL", name: "Course viewed only on cable TV"},function(err,cabl){
        if (err) throw err;
        console.log(cabl);
    });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603
   */
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
