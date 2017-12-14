
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    title: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        Region.hasMany(models.User, { foreignKey: 'regionId' });
      },
    },
  });
  return Region;
};
