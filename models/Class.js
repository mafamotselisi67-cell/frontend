const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_students: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false, // ✅ No createdAt/updatedAt in this table
  tableName: 'Classes',
});

module.exports = Class;
