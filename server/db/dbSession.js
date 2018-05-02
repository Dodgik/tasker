const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
//const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
//const config = require('../config/config.js')[env];
const config = require('../config/config.js');
const dbConfig = config.database;
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/
module.exports = sequelize