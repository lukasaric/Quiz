'use strict';

module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    duration: DataTypes.INTEGER,
    finalScore: DataTypes.FLOAT,
    attempts: DataTypes.INTEGER
  });

  Exam.associate = (models) => {
    Exam.belongsToMany(models.Question, {
      through: 'examQuestion',
      foreignKey: 'exam_fk'
    });
    Exam.belongsTo(models.Topic, {
      foreignKey: 'topic_fk'
    });
    Exam.belongsTo(models.User, {
      foreignKey: 'user_fk'
    });
  };
  return Exam;
};
