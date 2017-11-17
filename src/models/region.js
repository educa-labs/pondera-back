
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    title: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        Region.hasMany(models.City);
        Region.hasMany(models.User);
      },
    },
  });
  return Region;
};
