'use strict';

module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    text: DataTypes.STRING,
    correct: DataTypes.BOOLEAN,
    correctIndex: DataTypes.INTEGER
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Question, {
      foreignKey: 'question_fk'
    });
  };
  return Answer;
};
