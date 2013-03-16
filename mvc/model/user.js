var mongoose = require('mongoose');
require('../../db.js');
var userSchema = new mongoose.Schema({
  firstname : String,
  lastname : String,
  email:{
    type : String,
    lowercase : true
  }
});
module.exports =  mongoose.model('User', userSchema);

