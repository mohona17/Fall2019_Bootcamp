var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;
/*Purpose of request handler: send listingData in the JSON format as a response if a GET request 
is sent to the '/listings' path. Otherwise, it should send a 404 error.
*/
var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if (request.method == "GET" && parsedUrl.pathname == "/listings"){ //checks if GET and in /listings path
    response.write(listingData); //send listingData as JSON as response 
    response.statusCode = 200; //This status code means that everything is operating ok 
    response.end();
  }
  else {
    //COMMENT:send error
    response.statusCode = 404;
    response.write("Bad gateway error");
    response.end(); 
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  listingData = data; //save the data in the listingData variable, 

  if (err) throw err;// Check for errors

  listingData.statusCode = 200; //Save the sate in the listingData variable already defined
  server = http.createServer(requestHandler); //use the HTTP module to create a server that makes use of this request handler
    
  server.hostname = "/listings"; //sends the listing data on a GET request to localhost:8080/listings
  server.listen(port,function() { //start the server
        console.log('Node server running on port 8080');
  });
});
/*RESOURCES
    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

    HINT: Check out this resource on fs.readFile
    https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    - buffers the entire file, is a callback with err and data passed in
    HINT: Read up on JSON parsing Node.js
*/