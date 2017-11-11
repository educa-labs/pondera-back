
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    mat: DataTypes.INTEGER,
    leng: DataTypes.INTEGER,
    opt: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Score.belongsTo(models.User);
        Score.belongsTo(models.Opt);
      },
    },
  });
  return Score;
};
