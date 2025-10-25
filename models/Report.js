const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  submitted_by: DataTypes.INTEGER,
  submitted_to: DataTypes.INTEGER,
  class_id: DataTypes.INTEGER,

  faculty_name: DataTypes.STRING,
  class_name: DataTypes.STRING,
  week: DataTypes.STRING,
  date_of_lecture: DataTypes.DATEONLY,
  course_name: DataTypes.STRING,
  course_code: DataTypes.STRING,
  lecturer_name: DataTypes.STRING,
  actual_students: DataTypes.INTEGER,
  total_students: DataTypes.INTEGER,
  venue: DataTypes.STRING,
  scheduled_time: DataTypes.STRING,
  topic: DataTypes.TEXT,
  outcomes: DataTypes.TEXT,
  recommendations: DataTypes.TEXT,

  content: DataTypes.TEXT,
  feedback: DataTypes.TEXT,
}, {
  timestamps: false,
  tableName: 'Reports',
});

module.exports = Report;
