const express = require('express');
const router = express.Router();
const MainCategory = require('../models/mainCategory');
const checkAuth = require('../middleware/check-auth');

//get all
router.get('/', checkAuth, async (req, res) => {
	const query = { userId: req.userData.userId };
	try {
		const mainCat = await MainCategory.find(query);
		res.send(mainCat);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
//get one
router.get('/:id', getMainCat, (req, res) => {
	res.json(res.mainCat);
});
//create one
router.post('/', checkAuth, async (req, res) => {
	const mainCat = new MainCategory({
		title: req.body.title,
		color: req.body.color,
		userId: req.userData.userId
	});
	try {
		const newMainCat = await mainCat.save();
		res.status(201).json(newMainCat);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//update one
router.patch('/:id', getMainCat, async (req, res) => {
	if (req.body.title != null) {
		res.mainCat.title = req.body.title;
	}
	if (req.body.color != null) {
		res.mainCat.color = req.body.color;
	}
	try {
		const updatedMainCat = await res.mainCat.save();
		res.json(updatedMainCat);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//delete one
router.delete('/:id', getMainCat, async (req, res) => {
	try {
		await res.mainCat.remove();
		res.json({ message: 'Deleted Main Category' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getMainCat(req, res, next) {
	let mainCat;
	try {
		console.log('req.params.id, ', req.params.id);
		mainCat = await MainCategory.findById(req.params.id);
		if (mainCat == null) {
			return res.status(404).json({ message: 'Cannot find category' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.mainCat = mainCat;
	next();
}

module.exports = router;
