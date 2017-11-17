
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    mail: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_digest: DataTypes.STRING,
    rut: { type: DataTypes.STRING, unique: true, allowNull: false },
    hash: DataTypes.STRING,
    phone: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Score);
        User.belongsTo(models.City);
        User.belongsTo(models.Region);
      },
    },
    indexes: [
      { fields: ['token'], name: 'token_index' },
    ],
  });
  return User;
};
