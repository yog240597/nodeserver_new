
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

const KafkaSchema = mongoose.Schema({
	accountid: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
	kafkatopic:{
		type:String
	},
	topictype:{
		type:String
	}
});

module.exports =mongoose.model('Kafkas',KafkaSchema);