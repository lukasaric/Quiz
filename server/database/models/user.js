'use strict';

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

function hashPassword(user) {
  if (!user.changed('password')) {
    return;
  }

  return bcrypt.hash(user.password, parseInt(process.env.SALT_FACTOR))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Test, {
      foreignKey: 'user_fk'
    });
  };

  User.prototype.comparePassword = (password, saltPassword) => {
    return bcrypt.compare(password, saltPassword);
  };

  return User;
};
