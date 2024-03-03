import { Sequelize } from 'sequelize';

export const config = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number.parseInt(process.env.DATABASE_PORT || '5678'),
  dialect: 'postgres',
  pool: {
    max: parseInt(process.env.MAX_CONNECTION_POOL) || 50,
    min: 10,
    acquire: 60000,
    idle: 10000
  }
};
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  },
});

export default sequelize;