'use strict';
module.exports = (sequelize, DataTypes) => {
  var University = sequelize.define('University', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return University;
};