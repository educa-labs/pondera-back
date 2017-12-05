
module.exports = (sequelize, DataTypes) => {
  const Ponderation = sequelize.define('Ponderation', {
    value: DataTypes.INTEGER,
    university: DataTypes.TEXT,
    career: DataTypes.TEXT,
    universityId: { type: DataTypes.INTEGER, allowNull: false },
    careerId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        Ponderation.belongsTo(models.User);
      },
    },
    indexes: [
      { fields: ['universityId'], name: 'university_index' },
      { fields: ['careerId'], name: 'career_index' },
      { fields: ['userId'], name: 'user_index' },
    ],
  });
  return Ponderation;
};
