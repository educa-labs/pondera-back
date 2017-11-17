
module.exports = (sequelize, DataTypes) => {
  const Opt = sequelize.define('Opt', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Opt.hasMany(Score);
      },
    },
  });
  return Opt;
};
