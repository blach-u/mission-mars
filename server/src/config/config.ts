import { AppConfig } from '../types/astronautTypes';

const config: AppConfig = {
    app: {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '3001', 10),
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
};

export default config;
