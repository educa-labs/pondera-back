
module.exports = (sequelize, DataTypes) => {
  const Ponderation = sequelize.define('Ponderation', {
    value: DataTypes.INTEGER,
    university: DataTypes.TEXT,
    career: DataTypes.TEXT,
    university_id: { type: DataTypes.INTEGER, allowNull: false },
    career_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        Ponderation.belongsTo(models.User);
      },
    },
    indexes: [
      { fields: ['universityId'], name: 'university_index' },
      { fields: ['careerId'], name: 'career_index' },
    ],
  });
  return Ponderation;
};
