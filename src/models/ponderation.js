
module.exports = (sequelize, DataTypes) => {
  const Ponderation = sequelize.define('Ponderation', {
    value: DataTypes.INTEGER,
    university: DataTypes.TEXT,
    career: DataTypes.TEXT,
    universityId: { type: DataTypes.INTEGER, allowNull: false },
    careerId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    optId: { type: DataTypes.INTEGER, allowNull: true },
    NEM: { allowNull: false, type: DataTypes.INTEGER },
    ranking: { allowNull: false, type: DataTypes.INTEGER },
    math: { allowNull: false, type: DataTypes.INTEGER },
    language: { allowNull: false, type: DataTypes.INTEGER },
    science: { allowNull: true, type: DataTypes.INTEGER },
    history: { allowNull: true, type: DataTypes.INTEGER },
  }, {
    classMethods: {
      associate(models) {
        Ponderation.belongsTo(models.User, { foreignKey: 'userId' });
        Ponderation.belongsTo(models.Opt);
      },
    },
    indexes: [
      { fields: ['universityId'], name: 'university_index' },
      { fields: ['careerId'], name: 'career_index' },
    ],
  });
  return Ponderation;
};
