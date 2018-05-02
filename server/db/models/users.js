const Sequelize = require('sequelize');
var dbSession = require('../dbSession');

const User = dbSession.define('user', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Email must be a valid email address' },
    },
  },
  password: {
    type: Sequelize.STRING(128),
    allowNull: false,
    validate: {
      len: {
        args: 6,
        msg: "Password must be atleast 6 characters in length"
      },
    },
  },
  firstname: { type: Sequelize.STRING(128), notEmpty: true },
  lastname: { type: Sequelize.STRING(128), notEmpty: true },
  username: { type: Sequelize.STRING(128) },

  reset_code: { type: Sequelize.STRING(32) },

  last_login: { type: Sequelize.DATE },
  status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
}, {
  getterMethods: {
    displayName() {
      if (this.firstname) {
        return this.firstname;
      } else if (this.username) {
        return this.username;
      } else {
        return this.email.split('@')[0];
      }
    },
    fullName() {
      return this.firstname && this.lastname ? this.firstname + ' ' + this.lastname : '';
    }
  },
})

module.exports = User