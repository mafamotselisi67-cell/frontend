const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME || 'luct_reporting',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'mosiuoa',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
  }
);

module.exports = sequelize;
