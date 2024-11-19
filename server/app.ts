import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig';
import config from './src/config/config';
import cors from 'cors';
import astronautsRoute from './src/routes/astronautsRoutes';

const app = express();
const port = config.app.port || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', astronautsRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export default app;
