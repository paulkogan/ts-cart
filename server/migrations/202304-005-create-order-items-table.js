'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', 
    {
      order_item_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.UUID, 
        references: { model: 'products', key: 'product_id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      order_uuid: {
        allowNull: false,
        type: Sequelize.UUID, 
        references: { model: 'orders', key: 'order_uuid' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      num_units: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      tax: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      order_item_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      item_cart_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
down: async (queryInterface) => {
    await queryInterface.dropTable('order_items');
  }
};