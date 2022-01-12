import Sequelize, { DataTypes } from "sequelize";

import config from "../../database/config/config";

const db = {};

// Option 1: Passing a connection URI
db.sequelize = new Sequelize(
  `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
);

// db.User = require("../model/UserModel")(db.sequelize, DataTypes);

export { db };
