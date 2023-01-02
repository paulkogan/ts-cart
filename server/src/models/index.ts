const Sequelize = require("sequelize");
const userModel = require("./user.js");

const env = process.env.NODE_ENV || 'development';
import {env_config} from "../../config/config_json.js"
const config = env_config[env]
const config_options = config["config_options"]


const sequelize =  new Sequelize(config.database, config.username, 
    config.password, 
    config_options);

const models = {
    User: userModel(sequelize, Sequelize.DataTypes)
};



module.exports = {models, sequelize};


