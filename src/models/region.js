
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Region.hasMany(models.City);
      },
    },
  });
  return Region;
};
