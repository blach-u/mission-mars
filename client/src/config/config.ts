import { AppConfig } from '../types/astronautTypes';

const config : AppConfig = {
  app: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3001',
  },
};

export default config;

