
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Region.hasMany(models.City);
      },
    },
  });
  return Region;
};
