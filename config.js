//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
    db: {
      uri: 'mongodb+srv://guest:6HFPgRwPdN0QzKQi@cluster0-za3ii.mongodb.net/test?retryWrites=true&w=majority',
      //guest:6HFPgRwPdN0QzKQi
      //uri: 'mongodb://root:password1@ds243963.mlab.com:43963/bootcamp-three',
      //mongodb+srv://guest:VHJMnF6f3Oawe3DN@cen3031-course-za3ii.mongodb.net/test', //place the URI of your mongo database here.
      //test:JLIvMbEYY4FC3sac
    }
  };