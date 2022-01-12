import { DataTypes } from "sequelize";
import { db } from "../config/sequelize";

export default db.sequelize.define(
  "usuario",
  {
    user: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    movil: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  { timestamps: false }
);

// await User.sync({ force: true });

// export { User };
