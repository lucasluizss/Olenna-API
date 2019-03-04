import express 	from 'express';
import User 		from '../models/User';
import uuidv4		from 'uuid/v4';

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
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		birthDate: request.body.birthDate
	},
	(error, user) => {
		if (error) 
			return response.status(500).send(`There was a problem adding the information to the database. Error: ${error.message}`);

		response.status(201).json({
			Message: `User ${request.body.firstName} added with success!`, user
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
			Message: `User with id: ${id} found!`, user
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
			Message: `User with id: ${id} was deleted!`
		});
	});
});

router.delete('/:userId', (request, response) => {
	const id = request.params.userId;

	User.findByIdAndRemove(id, function (error, user) {
		if (error) {
			return response.status(500).json({ Message: 'There was a problem deleting the user.' });
		} else if (!user) {
			return response.status(404).json({ Message: 'No user found.' });
		}		

		response.status(200).json({ Message: `User with id: ${id} was deleted!` });
	});
});

export default router;
