'use strict';
module.exports = (sequelize, DataTypes) => {
  var Career = sequelize.define('Career', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Career;
};