
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        City.belongsTo(models.region);
        City.hasMany(models.User);
      },
    },
    // indexes: [
    //   { fields: ['regionId'], name: 'regionId_index' },
    // ],
  });
  return City;
};
