import 'dotenv/config';

export default {
  server: {
    NAME: 'LOCALHOST',
    PORT: process.env.PORT || 3004
  },
  db: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME
  }
}