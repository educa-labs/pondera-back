module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('seedeando');
    return queryInterface.bulkInsert('Opts', [
      { name: 'Ciencias', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Historia', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Opts', null, {});
  },
};
