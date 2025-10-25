const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Monitoring = sequelize.define('Monitoring', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendance_rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  feedback_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // ✅ createdAt and updatedAt exist
  tableName: 'Monitorings',
});

module.exports = Monitoring;