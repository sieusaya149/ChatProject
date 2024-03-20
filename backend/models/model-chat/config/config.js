module.exports = {
  development: {
    username: process.env.DATABASE_CHAT_USERNAME,
    password: process.env.DATABASE_CHAT_PASSWORD,
    database: process.env.DATABASE_CHAT_NAME,
    host: process.env.DATABASE_CHAT_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DATABASE_CHAT_PORT
  }
};