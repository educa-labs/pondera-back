
module.exports = (sequelize, DataTypes) => {
  const Opt = sequelize.define('Opt', {
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
