import express      		from 'express';
import bodyParser   		from 'body-parser';
import usersRoutes  		from './src/routes/Users';
import swaggerUi				from 'swagger-ui-express';
import swaggerDocument 	from './swagger.json';
import * as Utils 			from './src/middleware/Utils';
import 									'./src/db/MongoDB';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Utils.EnableCors);
app.use(Utils.RouteTracker);

app.use('/users', usersRoutes);

app.use(Utils.ErrorTracker);

export default app;
