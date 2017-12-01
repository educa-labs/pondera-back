
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mail: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING,
    },
    password_digest: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rut: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
