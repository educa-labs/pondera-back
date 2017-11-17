const encrypt = require('../../helpers/session');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'don felipe',
      mail: 'a@a.cl',
      rut: '19291235-0',
      phone: '+569569569',
      city: 'wuat wea',
      password_digest: encrypt.encryptPasswd('123123'), 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
