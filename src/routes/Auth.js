import express 	from 'express';
import jwt 			from 'jsonwebtoken';
import bcrypt 	from 'bcryptjs';
import User 		from '../models/User';

const router = express.Router();

router.get('/info', (request, response) => {
	const token = request.headers['token'];
  
	if (!token) 
		return response.status(401).json({ Auth: false, Message: 'No token provided.' });
  
	jwt.verify(token, process.env.Secret, (error, decoded) => {
		if (error) {
			return response.status(500).json({ 
				Auth: false, 
				Message: `Failed to authenticate token. Error: ${error.message}` 
			});
		}
    
		response.status(200).json({ decoded });
	});
});

router.post('/login', (request, response) => {
	User.findOne({ email: request.body.email }, (error, user) => {
		if (error) 
			return response.status(500).json({ Message: 'Error on the server.' });
		if (!user) 
			return response.status(404).json({ Message: 'No user found.' });

		const passwordIsValid = bcrypt.compareSync(request.body.password, user.password);

		if (!passwordIsValid) 
			return response.status(401).json({ Auth: false, Token: null });

		const token = jwt.sign({ id: user._id }, process.env.Secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		response.status(200).json({ 
			Auth: true, 
			Token: token 
		});
	});
});

router.post('/logout', (request, response) => {
	response.status(200).json({ auth: false, token: null });
});

export default router;
