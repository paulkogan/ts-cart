'use strict';

const {Model, Optional} = require('sequelize')
const uuid = require('uuidv4')


const productModel = (sequelize, DataTypes) => {

    const Product = sequelize.define(
      'products', //name of table
      {
        productId: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.TEXT,
          unique: true,
        }, 

        price: {
          allowNull: false,
          type: DataTypes.DECIMAL(10,2)
        },
        description: {
          allowNull: true,
          type: DataTypes.TEXT
        },
        imageURL: {
          allowNull: true,
          type: DataTypes.TEXT
        },

      }, {});
      
      Product.beforeCreate(product => product.productId = uuid());

      Product.removeAttribute('id');

      Product.associate = function(models) {
        // associations can be defined here
      };
    //sequelize.sync({alter:true})
    return Product;
  };

module.exports = productModel

