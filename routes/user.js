const express = require('express');
const router = express.Router();
//require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
	try {
		const user = await User.find();
		res.send(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//sign up
router.post('/signup', (req, res) => {
	User.find({ email: req.body.email }).exec().then((user) => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'User already exists with that email'
			});
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				} else {
					const user = new User({
						email: req.body.email,
						password: hash
					});
					user
						.save()
						.then((result) => {
							res.status(201).json({ message: 'User created' });
						})
						.catch((err) => {
							res.status(500).json({ message: err.message });
						});
				}
			});
		}
	});
});

//sign in
router.post('/login', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.lengh < 1) {
				return res.status(401).json({ message: 'Auth Failed' });
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({ message: 'Auth Failed' });
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id
						},
						process.env.JWT_KEY,
						{
							expiresIn: '7d'
						}
					);
					return res.status(200).json({ message: 'Auth successful', token: token });
				}
				res.status(401).json({ message: 'Auth Failed' });
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

module.exports = router;
