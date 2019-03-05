//#region Extension Methods
String.prototype.capFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

//#endregion

//#region Express Middleware Methods
export const EnableCors = (request, response, next) => {
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
};

export const RouteTracker = (request, next) => {
	console.log(`===> Method: ${request.method} on entity ${request.path}.`);
	next();
};

export const ErrorTracker = (request, response) => {
	const error = new Error(`Not found '${request.path}'!`);
	error.status = 404;
	
	response.status(error.status || 500);
	response.json({
		Error: {
			Status: error.status,
			Message: error.message
		}
	});
};

//#endregion
