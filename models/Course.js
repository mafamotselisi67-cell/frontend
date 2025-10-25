const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  stream: DataTypes.STRING,
  created_by: DataTypes.INTEGER,
}, {
  timestamps: true, // ✅ createdAt and updatedAt exist
  tableName: 'Courses',
});

module.exports = Course;