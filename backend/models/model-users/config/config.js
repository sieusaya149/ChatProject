module.exports = {
    development: {
      username: process.env.DATABASE_USER_USERNAME,
      password: process.env.DATABASE_USER_PASSWORD,
      database: process.env.DATABASE_USER_NAME,
      host: process.env.DATABASE_USER_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DATABASE_USER_PORT
    }
  };