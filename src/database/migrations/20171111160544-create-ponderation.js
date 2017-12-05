
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ponderations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    value: {
      type: Sequelize.FLOAT,
    },
    university: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    career: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    universityId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    careerId: {
      allowNull: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Ponderations'),
};
