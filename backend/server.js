import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import data from './data.js';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

connectDB();

const app = express();

app.get('/api/products/:id', (req, res) => {
	const product = data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found' });
	}
});

app.get('/api/products', (req, res) => {
	res.send(data.products);
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
	return res.send('Server is ready');
});

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
	console.log(`Server at localhost:${PORT}`);
});
