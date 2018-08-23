'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    text: DataTypes.STRING(1024)
  });

  Question.prototype.loadAnswers = async function (options) {
    const answers = await this.getAnswers(options);
    this.setDataValue('answers', answers);
    return this;
  };

  Question.associate = (models) => {
    Question.belongsTo(models.Topic, {
      foreignKey: 'topic_fk'
    });
    Question.belongsToMany(models.Test, {
      through: 'testQuestion',
      foreignKey: 'question_fk'
    });
    Question.hasMany(models.Answer, {
      foreignKey: 'question_fk'
    });
  };
  return Question;
};
