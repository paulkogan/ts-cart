const Sequelize = require("sequelize");
const userModel = require("./user.js");
const productModel = require("./product.js");

const env = process.env.NODE_ENV || 'development';
import {env_config} from "../../config/config_json.js"
const config = env_config[env]

const sequelize =  new Sequelize(
    config.database, 
    config.username, 
    config.password,  {
        host: config.host, 
        dialect: config.dialect,
    },
    );

const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    Product: productModel(sequelize, Sequelize.DataTypes)
};



module.exports = {models, sequelize};


