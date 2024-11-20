import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig';
import config from '../server/src/config/config';
import cors from 'cors';
import astronautsRoute from './src/routes/astronautsRoutes';

const app = express();
const port = config.app.port || 3001;

app.use(cors({
    origin: config.app.corsOrigin,
}));
app.use(bodyParser.json());

if (config.app.env !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

app.use('/api', astronautsRoute);

app.listen(port, () => {
    console.log(`Server is running in ${config.app.env} mode on port ${port}`);
});

export default app;
