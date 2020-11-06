import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
	'/seed',
	asyncHandler(async (req, res) => {
		// await User.remove({}); <- Not necessary as we won't be reinserting existing users into DB. Just want to throw warning.
		const createdUsers = await User.insertMany(data.users);
		res.send({ createdUsers });
	})
);

userRouter.post(
	'/signin',
	asyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user.id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).send({ message: 'Invalid email or password' });
	})
);

userRouter.post(
	'/register',
	asyncHandler(async (req, res) => {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
		});
		const createdUser = await user.save();
		res.send({
			_id: createdUser.id,
			name: createdUser.name,
			email: createdUser.email,
			isAdmin: createdUser.isAdmin,
			token: generateToken(createdUser),
		});
	})
);

export default userRouter;
