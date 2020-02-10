require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const mainCatRouter = require('./routes/mainCategory');
const subCatRouter = require('./routes/subCategory');
const linkRouter = require('./routes/links');
const userRouter = require('./routes/user');

app.use('/mainCat', mainCatRouter);
app.use('/subCat', subCatRouter);
app.use('/links', linkRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, () => console.log('Server started'));
