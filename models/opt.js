
module.exports = (sequelize, DataTypes) => {
  var Opt = sequelize.define('Opt', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Opt.hasMany(Score);
      },
    },
  });
  return Opt;
};
