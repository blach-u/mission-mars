interface AstronautAttributes {
  id?: number;
  name: string;
  role: string;
}

interface AppConfig {
  app: {
    env: string;
    port: number;
    corsOrigin: string;
  };
}
export type { AstronautAttributes, AppConfig };
