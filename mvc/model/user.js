var mongoose = require('mongoose');
require('../../db.js');
var userSchema = new mongoose.Schema({
 fbId: String,
	name: String,
	email:{ type: String, lowerCase: true},
	username: String
});
module.exports =  mongoose.model('User', userSchema);

