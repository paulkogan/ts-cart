'use strict';

const orderItemModel = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
      'orders_items', //name of table
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
      item_cart_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      order_item_status: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      cost: {
        allowNull: true,
        type: DataTypes.DECIMAL(10,2)
      },
      tax: {
        allowNull: true,
        type: DataTypes.DECIMAL(10,2)
      }
    }, 
    {
        //tableName: "users",
        //timedstamps: false, 
        updatedAt: false,
        createdAt: false
    });

    OrderItem.createNew = async (new_order_item) => {
        return await OrderItem.create(new_order_item)

    }

    OrderItem.removeAttribute('id');

    return OrderItem;
  };

module.exports = orderItemModel

