const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('student', 'lecturer', 'prl', 'pl'), allowNull: false },
  stream: { type: DataTypes.STRING, allowNull: true }, // For PRL users to specify their stream
}, {
  timestamps: true,
});

module.exports = User;
