const { Course, Class, Report, Monitoring, Rating, User, StudentClass } = require('../models/index');

exports.getPLDashboard = async (req, res) => {
  try {
    const plId = req.params.plId;

    const courses = await Course.findAll({ where: { created_by: plId } }) || [];
    const classes = await Class.findAll({ where: { lecturer_id: plId } }) || [];
    const reports = await Report.findAll({ where: { submitted_to: plId } }) || [];
    const monitoring = await Monitoring.findAll({ where: { user_id: plId } }) || [];
    const ratings = await Rating.findAll({ where: { lecturer_id: plId } }) || [];

    res.json({ courses, classes, reports, monitoring, ratings });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      error: err.message,
      courses: [],
      classes: [],
      reports: [],
      monitoring: [],
      ratings: [],
    });
  }
};

exports.assignStudentToClass = async (req, res) => {
  try {
    const { student_id, class_id } = req.body;

    // Check if student exists and is a student
    const student = await User.findByPk(student_id);
    if (!student || student.role !== 'student') {
      return res.status(400).json({ error: 'Invalid student' });
    }

    // Check if class exists
    const classInstance = await Class.findByPk(class_id);
    if (!classInstance) {
      return res.status(400).json({ error: 'Invalid class' });
    }

    // Check if already enrolled
    const existingEnrollment = await StudentClass.findOne({
      where: { student_id, class_id }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student is already enrolled in this class' });
    }

    const enrollment = await StudentClass.create({
      student_id,
      class_id
    });

    res.status(201).json({ message: 'Student assigned to class successfully', enrollment });
  } catch (err) {
    console.error('Error assigning student to class:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'email']
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
