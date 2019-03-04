import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	_id: String,
	firstName: String,
	lastName: String,
	birthDate: Date
});

mongoose.model('User', UserSchema, 'Users');

export default mongoose.model('User');
