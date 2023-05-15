'use strict';

//** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('products', 
    {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING
      },

      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      image_url: {
        allowNull: true,
        type: Sequelize.STRING
      },

      price: {
      type: Sequelize.INTEGER,
      allowNull: false
      },
    });
  },
down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};