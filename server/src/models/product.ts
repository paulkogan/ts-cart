'use strict';
const {Model, Optional} = require('sequelize')
const uuid = require('uuidv4')


const productModel = (sequelize, DataTypes) => {

    const Product = sequelize.define(
      'products', //name of table
      {
        product_id: {
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
        inventory: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        description: {
          allowNull: true,
          type: DataTypes.TEXT
        },
        image_url: {
          allowNull: true,
          type: DataTypes.TEXT
        },

      }, 
      {
        //tableName: "users",
        //timedstamps: false, 
        updatedAt: false,
        createdAt: false
      });

      Product.createNew = async (new_product) => {
        return await Product.create(new_product)

      }
  

      // can you make this work?
      //Product.beforeCreate(product => product.product_id = uuid());

      Product.removeAttribute('id');
      // Product.removeAttribute('createdat');
      // Product.removeAttribute('updatedAt');

      Product.associate = function(models) {
        // associations can be defined here
      };
    //sequelize.sync({alter:true})
    return Product;
  };

module.exports = productModel

