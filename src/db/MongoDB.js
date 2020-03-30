import mongoose from 'mongoose';

mongoose.connect(process.env.MongoDB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});
