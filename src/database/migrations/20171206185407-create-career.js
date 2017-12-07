module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Careers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Careers');
  }
};