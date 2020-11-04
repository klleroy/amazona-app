import mongo from 'mongoose';

const userSchema = new mongo.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongo.model('User', userSchema);

export default User;
