module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Opts', [
    { title: 'Ciencias', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Historia', createdAt: new Date(), updatedAt: new Date() },
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Opts', null, {}),
};
