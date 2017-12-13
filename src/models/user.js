
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    mail: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_digest: DataTypes.STRING,
    rut: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: DataTypes.STRING,
    token: DataTypes.STRING,
    // regionId: { type: DataTypes.INTEGER, allowNull: false },
    admin: { type: DataTypes.BOOLEAN, default: false },
    superadmin: { type: DataTypes.BOOLEAN, default: false },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Score);
        User.belongsTo(models.Region, { foreignKey: 'regionId' });
        User.hasMany(models.Ponderation, { foreignKey: 'userId' });
      },
    },
    indexes: [
      { fields: ['token'], name: 'token_index' },
    ],
  });
  return User;
};
