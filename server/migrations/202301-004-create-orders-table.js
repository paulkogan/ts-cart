'use strict';

//** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', 
    {
      order_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV,
      },
      user_uuid: {
        allowNull: false,
        type: Sequelize.UUID, 
        references: { model: 'users', key: 'user_uuid' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },

      date_placed: {
        allowNull: false,
        type: Sequelize.DATE
      },
      delivery_us_state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      order_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      items_total: {
        allowNull: true,
        type: Sequelize.DECIMAL(10,2)
      },
      tax_total: {
        allowNull: true,
        type: Sequelize.DECIMAL(10,2)
      },
      shipping_total: {
        allowNull: true,
        type: Sequelize.DECIMAL(10,2)
      }

    });
  },
down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  }
};