
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ponderations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    value: {
      type: Sequelize.INTEGER,
    },
    university: {
      type: Sequelize.TEXT,
    },
    career: {
      type: Sequelize.TEXT,
    },
    university_id: {
      type: Sequelize.INTEGER,
    },
    career_id: {
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
