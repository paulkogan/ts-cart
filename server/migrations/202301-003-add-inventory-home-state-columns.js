'use strict';
//import _ from 'lodash';
const _ = require('lodash');



module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      {
        tableName: 'products'
      },
      'inventory',
      Sequelize.INTEGER,
      false,
    );
},
down: _.noop
}