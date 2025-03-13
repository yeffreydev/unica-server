declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
    SALT_ROUNDS: number;
  }
}
