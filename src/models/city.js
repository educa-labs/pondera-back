
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        City.belongsTo(models.region);
      },
    },
  });
  return City;
};
