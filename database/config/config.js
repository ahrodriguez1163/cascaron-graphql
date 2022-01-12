require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME || "llillototote",
  password: process.env.DB_PASSWORD || "llillototote",
  database: process.env.DB_DATABASE || "rentas",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || "postgres",
};
