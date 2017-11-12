
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Scores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    mat: {
      type: Sequelize.INTEGER,
    },
    leng: {
      type: Sequelize.INTEGER,
    },
    opt: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Scores'),
};
