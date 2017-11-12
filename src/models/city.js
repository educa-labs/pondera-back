
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        City.belongsTo(models.region);
      },
    },
    // indexes: [
    //   { fields: ['regionId'], name: 'regionId_index' },
    // ],
  });
  return City;
};
