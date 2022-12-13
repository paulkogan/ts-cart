"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Sequelize } from 'sequelize';
const Sequelize = require("sequelize");
const userModel = require("./user.js");
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const config_json_js_1 = require("../../config/config_json.js");
// console.log('================')
// console.log(env_config)
const config = config_json_js_1.env_config[env];
// const sequelize = config.url
//   ? new Sequelize(config.url, config)
//   : new Sequelize(config.database, config.username, config.password, config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
//const User = sequelize.User
const models = {
    User: userModel(sequelize, Sequelize.DataTypes)
};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
module.exports = { models, sequelize, Sequelize };
//export { Sequelize, sequelize };
//export default sequelize;
//# sourceMappingURL=index.js.map