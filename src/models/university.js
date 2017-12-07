

module.exports = (sequelize, DataTypes) => {
  let University = sequelize.define('University', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return University;
};
