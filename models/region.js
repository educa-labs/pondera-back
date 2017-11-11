
module.exports = (sequelize, DataTypes) => {
  var Region = sequelize.define('Region', {
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
