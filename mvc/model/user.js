var mongoose = require('mongoose');
require('../../db.js');
var userSchema = new mongoose.Schema({
 	fbId: String,
	name: String,
	email:{ type: String, lowerCase: true},
	username: String,
	location: String,
	accessToken: String,
	phone:String,
	profileSetup:String,
	group_ids_list : Array
});
module.exports =  mongoose.model('User', userSchema);

