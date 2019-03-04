import express      from 'express';
import bodyParser   from 'body-parser';
// eslint-disable-next-line no-unused-vars
import MongoDB			from './api/db/MongoDB';
import usersRoutes  from './api/routes/Users';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-requestuested-With, Content-Type, Accept, Authorization'
	);
	
	if (request.method === 'OPTIONS') {
		response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		return response.status(200).json({});
	}

	return next();
});

app.use('/users', usersRoutes);

app.use((request, response, next) => {
	response.status(200).json({
		message: 'Hello World!'
	});
});

//TODO: Middleware to catch errors
app.use((request, response, next) => {
	const error = new Error('Not found!');
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		error: {
			status: error.status,
			message: error.message
		}
	});
});

export default app;
