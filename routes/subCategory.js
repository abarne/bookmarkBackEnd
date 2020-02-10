const express = require('express');
const router = express.Router();
const MainCategory = require('../models/mainCategory');
const SubCategory = require('../models/subCategory');

//get all
router.get('/:id', async (req, res) => {
	const query = { mainCategoryId: req.params.id };
	try {
		const subCat = await SubCategory.find(query);
		res.send(subCat);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
//get one
router.get('/:id', getSubCat, (req, res) => {
	res.json(res.subCat);
});
//create one
router.post('/:id', async (req, res) => {
	const subCat = new SubCategory({
		title: req.body.title,
		color: req.body.color,
		mainCategoryId: req.params.id
	});
	try {
		const newSubCat = await subCat.save();
		console.log(newSubCat);
		res.status(201).json(newSubCat);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//update one
router.patch('/:id', getSubCat, async (req, res) => {
	if (req.body.title != null) {
		res.subCat.title = req.body.title;
	}
	if (req.body.color != null) {
		res.subCat.color = req.body.color;
	}
	try {
		const updatedSubCat = await res.subCat.save();
		res.json(updatedSubCat);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//delete one
router.delete('/:id', getSubCat, async (req, res) => {
	try {
		await res.subCat.remove();
		res.json({ message: 'Deleted Sub Category' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getSubCat(req, res, next) {
	let subCat;
	try {
		subCat = await SubCategory.findById(req.params.id);
		if (subCat == null) {
			return res.status(404).json({ message: 'Cannot find category' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.subCat = subCat;
	next();
}

module.exports = router;
