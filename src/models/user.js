
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    hash: DataTypes.STRING,
    rut: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Score);
      },
    },
    indexes: [
      { fields: ['token'], name: 'token_index' },
    ],
  });
  return User;
};
