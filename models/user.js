'use strict';
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
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};