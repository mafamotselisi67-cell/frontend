const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // ✅ Import User model

const Rating = sequelize.define('Rating', {
 lecturer_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
},
course_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
},
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rater_id: DataTypes.INTEGER,
  lecturer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: DataTypes.INTEGER,
  comments: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'Ratings',
});

// Associations defined in models/index.js

module.exports = Rating;