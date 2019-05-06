import jwt from 'jsonwebtoken';

export const VerifyToken = (request, response, next) => {
	const allowedPaths = ['/login', '/logout', '/users/new'];

	if (!allowedPaths.includes(request.path)) {
		const token = request.headers['token'];

		if (!token)
			return response.status(403).send({ Auth: false, Message: 'No token provided.' });
			
		jwt.verify(token, process.env.Secret, (error, decoded) => {
			if (error) {
				return response.status(500).send({ 
					Auth: false, 
					Message: 'Failed to authenticate token.' 
				});
			}
			
			request.userId = decoded.id;
			
			next();
		});
	} else next();
};