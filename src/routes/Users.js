import express 	from 'express';
import User 		from '../models/User';
import uuidv4		from 'uuid/v4';
import 					'../middleware/Utils';

const router = express.Router();

router.get('/', (request, response) => {
	User.find({}, (error, users) => {
		if (error) {
			return response.status(500).json({ Message: 'Error to find users.' });
		}

		response.status(200).json({
			Message: 'Handling GET requestuest of the /users',
			Users: users
		});
	});
});

router.post('/', (request, response) => {
	User.create({
		_id: uuidv4(),
		firstName: 	request.body.firstName.capFirst(),
		lastName: 	request.body.lastName.capFirst(),
		birthDate: 	request.body.birthDate,
		email: 			request.body.email
	},
	(error, user) => {
		if (error) 
			return response.status(500).json({ Message: error.message });

		response.status(201).json({
			Message: `User ${request.body.firstName} added with success!`, 
			User: user
		});
	});
});

router.get('/:userId', (request, response) => {
	const id = request.params.userId;
  
	User.findById(id, (error, user) => {
		if (error) {
			return response.status(500).json({ Message: 'There was a problem finding the user.' });
		} else if (!user) {
			return response.status(404).json({ Message: 'No user found.' });
		}		

		response.status(200).json({
			Message: `User with id: ${id} found!`, 
			User: user
		});
	});
});

//Can also use Put here
router.patch('/:userId', (request, response) => {
	const id = request.params.userId;

	User.findByIdAndUpdate(id, request.body, {new: true}, (error, user) => {
		if (error) {
			return response.status(500).json({ Message: 'There was a problem updating the user.' });
		} else if (!user) {
			return response.status(404).json({ Message: 'No user found.' });
		}		

		response.status(200).json({
			Message: `User with id: ${id} was updated!`,
			User: request.body
		});
	});
});

router.delete('/:userId', (request, response) => {
	const id = request.params.userId;

	User.findByIdAndDelete(id, (error, user) => {
		if (error) {
			return response.status(500).json({ Message: 'There was a problem deleting the user.' });
		} else if (!user) {
			return response.status(404).json({ Message: 'No user found!' });
		}		

		response.status(200).json({ Message: `User with id: ${id} was deleted!` });
	});
});

export default router;
