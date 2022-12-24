/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import DBConnection from './infrastructure/database/db_connection';
import apiRoutes from './routes/index';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const db = new DBConnection();

/**
 * App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRoutes);

/**
 * Server Activation
 */

app.listen(PORT, async () => {
  console.log(`✅ Listening on PORT ${PORT}`);
  await db.postgresConnection();
  await db.mongoConnection();
});
