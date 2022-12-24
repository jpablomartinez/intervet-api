import mongoose, { Mongoose } from 'mongoose';
import { Sequelize } from 'sequelize';
import { sequelize } from './postgresql/db_instance';
import { env } from '../configuration/environment';

class DBConnection {
  /**
   * @returns postgres db connection instance
   */
  async postgresConnection(): Promise<Sequelize> {
    try {
      const postgres_connection = await sequelize.sync({});
      console.log('✅ Postgres db Connection Done');
      return postgres_connection;
    } catch (err: any) {
      console.log(`❌ postgres db connection error: ${err}`);
      throw err;
    }
  }
  /**
   * @returns mongo connection instance
   */
  async mongoConnection(): Promise<Mongoose> {
    try {
      const mongo_connection = await mongoose.connect(
        `mongodb+srv://${env.mongo_username}:${env.mongo_password}@intervet-db.jexylc8.mongodb.net/?retryWrites=true&w=majority`
      );
      mongoose.set('strictQuery', true);
      console.log('✅ Mongodb connection ok');
      return mongo_connection;
    } catch (err: any) {
      console.log(`❌ Mongodb connection error: ${err}`);
      throw err;
    }
  }
}

export default DBConnection;
