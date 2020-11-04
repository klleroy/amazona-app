import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const generateToken = (user) => {
	return jwt.sign(
		{
			__id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);
};
