'use strict';

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    type: DataTypes.STRING
  });

  Topic.associate = (models) => {
    Topic.hasMany(models.Question, {
      foreignKey: 'topic_fk'
    });
    Topic.hasMany(models.Test, {
      foreignKey: 'topic_fk'
    });
  };
  return Topic;
};
