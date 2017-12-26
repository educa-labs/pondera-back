

module.exports = (sequelize, DataTypes) => {
  let Career = sequelize.define('Career', {
    title: DataTypes.STRING,
    UgmId: DataTypes.STRING,
    UcenId: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Career;
};
