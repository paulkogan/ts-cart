'use strict';

const orderItemModel = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
      'order_items', //name of table
     {
      order_item_uuid: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: DataTypes.UUID,
        unique: true,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.UUID, 
        references: { model: 'products', key: 'product_id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      order_uuid: {
        allowNull: false,
        type: DataTypes.UUID, 
        references: { model: 'orders', key: 'order_uuid' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      num_units: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      order_item_status: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      cost: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      tax: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }, 
    {
        //tableName: "users",
        //timedstamps: false, 
        updatedAt: false,
        createdAt: false

    }
    // example of associate code in model
    // // we do it in the index instead
    // {
    //   classMethods:{
    //     associate:(models)=> {
    //       OrderItem.belongsTo(models.Order,{foreignKey:'order_uuid'})
    //     }
    //   }
      
    // }
    
    );

    OrderItem.createNew = async (new_order_item) => {
        //console.log(`\nMODEL - OrderITEM.Create: ${JSON.stringify(new_order_item)}\n\n`)
        return await OrderItem.create(new_order_item)
    }

    OrderItem.removeAttribute('id');

    return OrderItem;
  };

module.exports = orderItemModel

