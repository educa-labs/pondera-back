module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'don felipe',
      mail: 'a@.cl',
      rut: '19291235-0',
      phone: '+569569569',
      city: 'wuat wea',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
