import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	_id: String,
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	birthDate: {
		type: Date,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate(value) {
			if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)) {
				throw new Error('Email is invalid!');
			}
		}
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

mongoose.model('User', UserSchema, 'Users');

export default mongoose.model('User');
