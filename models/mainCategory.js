const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	color: {
		type: String
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
