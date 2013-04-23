var mongoose = require('mongoose');
require('../../db.js');
var groupSchema = new mongoose.Schema({
 	guid: String,
	group_name: String,
	location: Object,
	group_owner_uid : Array,
	type: String
});
module.exports =  mongoose.model('Group', groupSchema);