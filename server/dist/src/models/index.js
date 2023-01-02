"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const userModel = require("./user.js");
const productModel = require("./product.js");
const env = process.env.NODE_ENV || 'development';
const config_json_js_1 = require("../../config/config_json.js");
const config = config_json_js_1.env_config[env];
const config_options = config["config_options"];
const sequelize = new Sequelize(config.database, config.username, config.password, config_options);
const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    Product: productModel(sequelize, Sequelize.DataTypes)
};
module.exports = { models, sequelize };
//# sourceMappingURL=index.js.map