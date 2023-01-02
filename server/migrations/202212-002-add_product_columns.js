'use strict';
//import _ from 'lodash';
const _ = require('lodash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: 'products'
      },
      'price',
      Sequelize.DECIMAL(10,2),
      false,
    );


  },
  down: _.noop,
};


//await queryInterface.removeColumn({  tableName: 'products' }, 'price');