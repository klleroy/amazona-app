import express from 'express';
import asyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get(
	'/seed',
	asyncHandler(async (req, res) => {
		// await User.remove({}); <- Not necessary as we won't be reinserting existing users into DB. Just want to throw warning.
		const createdUsers = await User.insertMany(data.users);
		res.send({ createdUsers });
	})
);

export default userRouter;
