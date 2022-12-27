import dbConfig from "../config/config.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Sequelize = require("sequelize");
import postModel from "./postModel.js";
import userModel from "./userModel.js";

const sequelizeConfig = new Sequelize(
  dbConfig.db,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const Posts = postModel(sequelizeConfig, Sequelize);
const Users = userModel(sequelizeConfig, Sequelize);

Users.hasMany(Posts, {
  foreignKey: { name: "userId", allowNull: false },
});
Posts.belongsTo(Users, {
  foreignKey: { name: "userId", allowNull: false },
  as: "user",
});

const mariaDB = {
  sequelize: Sequelize,
  sequelizeConfig: sequelizeConfig,
  posts: Posts,
  users: Users,
};

export default mariaDB;
