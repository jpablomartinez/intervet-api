import { Sequelize } from 'sequelize';
import { env } from '../../configuration/environment';

export const sequelize = new Sequelize(
  `postgres://${env.postgres_username}:${env.postgres_password}@castor.db.elephantsql.com/${env.postgres_username}`,
);

sequelize
  .authenticate()
  .then(() => console.log('✅ DB Authentication done'))
  .catch((err) => console.error(`❌ error to connect: ${err}`));
