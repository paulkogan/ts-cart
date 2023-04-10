'use strict';

const orderModel = (sequelize, DataTypes) => {

    const Order = sequelize.define(
      'orders', //name of table
     {
      order_uuid: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: DataTypes.UUID,
        unique: true,
      },
      user_uuid: {
        allowNull: false,
        type: DataTypes.UUID, 
        references: { model: 'users', key: 'user_uuid' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },

      date_placed: {
        allowNull: false,
        type: DataTypes.DATE
      },
      delivery_us_state: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      order_status: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      items_total: {
        allowNull: true,
        type: DataTypes.DECIMAL(10,2)
      },
      tax_total: {
        allowNull: true,
        type: DataTypes.DECIMAL(10,2)
      },
      shipping_total: {
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

      Order.createNew = async (new_order) => {
        return await Order.create(new_order)

      }

      Order.removeAttribute('id');

    return Order;
  };

module.exports = orderModel

