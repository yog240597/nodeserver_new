const mongoose =require('mongoose');

const AccountSchema = mongoose.Schema({
	username:{
		type:String
	},
	password:{
		type:String
	},
	lastchanged:{
		type:Date,
		default:Date.now
	},
	permissionLevel:{
		type:Number
	},
	folderURL:{
		type:String
	},
});

module.exports =mongoose.model('Accounts',AccountSchema);