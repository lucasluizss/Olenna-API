import express      		from 'express';
import bodyParser   		from 'body-parser';

import userRoutes   		from './src/routes/User';
import authRoutes  		  from './src/routes/Auth';

import swaggerUi				from 'swagger-ui-express';
import swaggerDocument 	from './swagger.json';
import { VerifyToken }  from './src/middleware/Auth';
import * as Utils 			from './src/middleware/Utils';
import 									'./src/db/MongoDB';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Utils.EnableCors);
app.use(Utils.RouterTracker);
app.use(VerifyToken);

app.use('/', authRoutes);
app.use('/user', userRoutes);

app.use(Utils.ErrorTracker);

export default app;
