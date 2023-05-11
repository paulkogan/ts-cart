const Sequelize = require("sequelize");
const userModel = require("./user.js");
const productModel = require("./product.js");
const orderModel = require("./order.js");
const orderItemModel = require("./order_item.js");

const env = process.env.NODE_ENV || 'development';
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

const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    Product: productModel(sequelize, Sequelize.DataTypes),
    Order: orderModel(sequelize, Sequelize.DataTypes),
    OrderItem: orderItemModel(sequelize, Sequelize.DataTypes)
};

//models.Order.belongsTo(models.User,
models.Order.hasOne(models.User,
    {
        foreignKey: 'user_uuid',
        sourceKey: 'user_uuid', 
        as: "customer"
    });

models.OrderItem.hasOne(models.Order,
        {
            foreignKey: 'order_uuid',
            sourceKey: 'order_uuid', 
            as: "order"
        });

models.OrderItem.hasOne(models.Product,
    {
        foreignKey: 'product_id',
        sourceKey: 'product_id', 
        as: "product"
    });

module.exports = {models, sequelize};

