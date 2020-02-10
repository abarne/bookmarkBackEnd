const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	color: {
		type: String
	},
	subCategoryId: {
		type: Schema.Types.ObjectId,
		ref: 'SubCategory'
	}
});

module.exports = mongoose.model('Links', linksSchema);
