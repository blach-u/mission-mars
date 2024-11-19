import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Astronauts API',
            version: '1.0.0',
            description: 'API documentation for managing astronauts',
        },
        servers: [
            {
                url: 'http://localhost:3001/api',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
