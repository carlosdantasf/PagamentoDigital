'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV?.trim() || 'development';
console.log('Current environment:', env);
console.log('NODE_ENV:', process.env.NODE_ENV);

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DIALECT } = process.env;

const db = {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DIALECT
});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('Models loaded:', Object.keys(db));
console.log(db.Ticket)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
