const express = require('express');
const router = express.Router();
const SubCategory = require('../models/subCategory');
const Links = require('../models/links');

//get all
router.get('/:id', async (req, res) => {
	const query = { subCategoryId: req.params.id };
	try {
		const link = await Links.find(query);
		res.send(link);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
//get one
router.get('/', getLink, (req, res) => {
	res.json(res.link);
});
//create one
router.post('/:id', async (req, res) => {
	const link = new Links({
		title: req.body.title,
		color: req.body.color,
		link: req.body.link,
		subCategoryId: req.params.id
	});
	try {
		const newLink = await link.save();
		res.status(201).json(newLink);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//update one
router.patch('/:id', getLink, async (req, res) => {
	if (req.body.title != null) {
		res.link.title = req.body.title;
	}
	if (req.body.color != null) {
		res.link.color = req.body.color;
	}
	if (req.body.link != null) {
		res.link.link = req.body.link;
	}
	try {
		const updatedLink = await res.link.save();
		res.json(updatedLink);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
//delete one
router.delete('/:id', getLink, async (req, res) => {
	try {
		await res.link.remove();
		res.json({ message: 'Deleted Link' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getLink(req, res, next) {
	let link;
	try {
		link = await Links.findById(req.params.id);
		if (link == null) {
			return res.status(404).json({ message: 'Cannot find link' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.link = link;
	next();
}

module.exports = router;
