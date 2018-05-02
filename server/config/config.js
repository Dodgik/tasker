const env = process.env.NODE_ENV || 'development';
//const configJson = require('./config.json');
const fs = require('fs');
const ini = require('ini');
const configJson = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
//console.log('configJson=', configJson)
let defaultConfig = {
  "app_port": "65535",

  "protocol": "http",
  "host": "localhost:3000",

  "maps_api_key": "",

  "session_secret": "local-dev-ss",
  "session_name": "vas",

  "mail_host": "",
  "mail_port": "465",
  "mail_sender": "",
  "mail_user": "",
  "mail_password": "",
  "mail_support": "",

  "database": {
    "username": "sa",
    "password": "avas",
    "database": "monitor",
    "host": "127.0.0.1",
    "dialect": "mssql",
  },
}

for (let key in configJson) {
  defaultConfig[key] = configJson[key]
}
if (configJson.dialectOptions) {
  defaultConfig.database.dialectOptions = configJson.dialectOptions
}

//console.log('config=', defaultConfig)

module.exports = defaultConfig;