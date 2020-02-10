const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	color: {
		type: String
	},
	mainCategoryId: {
		type: Schema.Types.ObjectId,
		ref: 'MainCategory'
	}
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
