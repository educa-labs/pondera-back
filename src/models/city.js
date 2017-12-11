
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    title: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        City.belongsTo(models.Region);
      },
    },
    // indexes: [
    //   { fields: ['regionId'], name: 'regionId_index' },
    // ],
  });
  return City;
};
