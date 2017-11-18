
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Regions', [
    { title: 'I de Tarapacá', createdAt: new Date(), updatedAt: new Date() },
    { title: 'II de Antofagasta', createdAt: new Date(), updatedAt: new Date() },
    { title: 'III de Atacama', createdAt: new Date(), updatedAt: new Date() },
    { title: 'IV de Coquimbo', createdAt: new Date(), updatedAt: new Date() },
    { title: 'V de Valparaíso', createdAt: new Date(), updatedAt: new Date() },
    { title: "VI de O'Higgins", createdAt: new Date(), updatedAt: new Date() },
    { title: 'VII del Maule', createdAt: new Date(), updatedAt: new Date() },
    { title: 'VIII del Bío-Bío', createdAt: new Date(), updatedAt: new Date() },
    { title: 'IX de La Araucanía', createdAt: new Date(), updatedAt: new Date() },
    { title: 'X de Los Lagos', createdAt: new Date(), updatedAt: new Date() },
    { title: 'XI de Aysén', createdAt: new Date(), updatedAt: new Date() },
    { title: 'XII de Magallanes', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Metropolitana de Santiago', createdAt: new Date(), updatedAt: new Date() },
    { title: 'XIV de Los Ríos', createdAt: new Date(), updatedAt: new Date() },
    { title: 'XV de Arica y Parinacota', createdAt: new Date(), updatedAt: new Date() },
  ], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
