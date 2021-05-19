import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
import Router from './routes';
import errorHandling from './error';

const app = express();
app.use(express.json());
app.use(Router);
app.use(errorHandling);

app.use('/docs', swagger.serve, swagger.setup(swaggerDocs));

export default app;
