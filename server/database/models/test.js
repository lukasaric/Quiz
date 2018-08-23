'use strict';

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    numberOfQuestions: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    finalScore: DataTypes.FLOAT,
    attempts: DataTypes.INTEGER
  });

  Test.associate = (models) => {
    Test.belongsToMany(models.Question, {
      through: 'testQuestion',
      foreignKey: 'test_fk'
    });
    Test.belongsTo(models.Topic, {
      foreignKey: 'topic_fk'
    });
    Test.belongsTo(models.User, {
      foreignKey: 'user_fk'
    });
  };
  return Test;
};
