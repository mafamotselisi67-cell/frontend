const User = require('./User');
const Course = require('./Course');
const Class = require('./Class');
const Report = require('./Report');
const Monitoring = require('./Monitoring');
const Rating = require('./Rating');
const Feedback = require('./Feedback');
const StudentClass = require('./StudentClass');

// Associations
Class.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
Course.hasMany(Class, { foreignKey: 'course_id' });

Class.belongsTo(User, { foreignKey: 'lecturer_id', as: 'lecturer' });
User.hasMany(Class, { foreignKey: 'lecturer_id', as: 'classes' });

Monitoring.belongsTo(Class, { foreignKey: 'class_id' });
Class.hasMany(Monitoring, { foreignKey: 'class_id' });

Rating.belongsTo(User, { foreignKey: 'rater_id', as: 'student' });
Rating.belongsTo(Course, { foreignKey: 'course_id' });

Feedback.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Feedback.belongsTo(User, { foreignKey: 'recipient_id', as: 'recipient' });

// Student-Class many-to-many relationship
StudentClass.belongsTo(User, { foreignKey: 'student_id', as: 'student' });
StudentClass.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });
User.hasMany(StudentClass, { foreignKey: 'student_id' });
Class.hasMany(StudentClass, { foreignKey: 'class_id' });

module.exports = {
  User,
  Course,
  Class,
  Report,
  Monitoring,
  Rating,
  Feedback,
  StudentClass,
};
