

module.exports = (sequelize, DataTypes) => {
  let Career = sequelize.define('Career', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Career;
};
