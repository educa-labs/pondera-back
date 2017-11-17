
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
        // associations can be defined here
      },
    },
    indexes: [
      { fields: ['university_id'], name: 'university_index' },
      { fields: ['career_id'], name: 'career_index' },
    ],
  });
  return Ponderation;
};
