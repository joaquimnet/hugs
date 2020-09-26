const { Sequelize } = require('sequelize');

const { DB_HOST, DB_PASS, DB_USER, DB_DATABASE } = require('../config');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_DATABASE,
});

sequelize.authenticate().then(() => {});

global.sequelize = sequelize;

const User = require('./user');
const Hug = require('./hug');

module.exports = {
  User,
  Hug,
  sequelize,
};
