import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || '5000',
  base_url: process.env.URL || 'http://localhost:5000/api/v1',
  postgres_url: process.env.POSTGRESQL_URL,
  postgres_username: process.env.POSTGRES_USERNAME,
  postgres_password: process.env.POSTGRES_PASSWORD,
  mongo_username: process.env.MONGO_USERNAME,
  mongo_password: process.env.MONGODB_USER_PASSWORD,
  bcrypt_password: process.env.BCRYPT_PASSWORD,
  bcrypt_salt_rounds: process.env.SALT_ROUNDS
};
