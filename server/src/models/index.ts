const Sequelize = require("sequelize");
const userModel = require("./user.js");
const productModel = require("./product.js");
const orderModel = require("./order.js");

const env = process.env.NODE_ENV || 'development';
//import {env_config} from "../../config/config_json.js"
import env_config = require("../../config/config_json.js")
// console.log("========================")
// console.log(env_config)

const config = env_config[env]

const sequelize =  new Sequelize(
    config.database, 
    config.username, 
    config.password,  
    {
        host: config.host, 
        dialect: 'postgres'
    });
// const sequelize =  new Sequelize(
//     config.database, 
//     config.username, 
//     config.password,  
//     config
// );

const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    Product: productModel(sequelize, Sequelize.DataTypes),
    Order: orderModel(sequelize, Sequelize.DataTypes)
};

models.Order.hasOne(models.User,
//models.Order.belongsTo(models.User,
    {
        foreignKey: 'user_uuid',
        sourceKey: 'user_uuid', 
        as: "customer"
    });

module.exports = {models, sequelize};

