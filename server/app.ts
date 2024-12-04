import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig';
import config from './src/config/config';
import cors from 'cors';
import astronautsRoute from './src/routes/astronautsRoutes';
import axios from 'axios';

const app = express();
const port = config.app.port || 3001;

const url = 'https://mission-mars-prod.onrender.com';
const interval = 10 * 60 * 1000;

setInterval(() => {
    axios.get(url)
        .then(response => console.log(`Pinged at ${new Date().toISOString()}`))
        .catch(error => console.error(`Ping failed: ${error.message}`));
}, interval);

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
