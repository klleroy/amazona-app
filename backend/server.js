import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

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
