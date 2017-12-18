'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Careers', 'UgmId', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    });
  },
  down: (queryInterface, Sequelize) => {
  },
};
