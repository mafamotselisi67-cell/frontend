const { StudentClass, Class, Course, User } = require('../models/index');

exports.getStudentClasses = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const enrollments = await StudentClass.findAll({
      where: { student_id: studentId },
      include: [{
        model: Class,
        as: 'class',
        include: [
          { model: Course, as: 'course', attributes: ['title', 'stream'] },
          { model: User, as: 'lecturer', attributes: ['name', 'email'] }
        ]
      }],
      order: [['enrolled_at', 'DESC']]
    });

    const result = enrollments.map(enrollment => ({
      id: enrollment.class.id,
      name: enrollment.class.name,
      course_name: enrollment.class.course?.title || 'Unknown',
      stream: enrollment.class.course?.stream || 'Unknown',
      lecturer_name: enrollment.class.lecturer?.name || 'Unassigned',
      lecturer_email: enrollment.class.lecturer?.email || '',
      total_students: enrollment.class.total_students,
      schedule: enrollment.class.schedule,
      module: enrollment.class.module,
      enrolled_at: enrollment.enrolled_at
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching student classes:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.enrollStudentInClass = async (req, res) => {
  try {
    const { student_id, class_id } = req.body;

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

    res.status(201).json(enrollment);
  } catch (err) {
    console.error('Error enrolling student:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.unenrollStudentFromClass = async (req, res) => {
  try {
    const { studentId, classId } = req.params;

    const deleted = await StudentClass.destroy({
      where: { student_id: studentId, class_id: classId }
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({ message: 'Successfully unenrolled from class' });
  } catch (err) {
    console.error('Error unenrolling student:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableClasses = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Get classes the student is already enrolled in
    const enrolledClassIds = await StudentClass.findAll({
      where: { student_id: studentId },
      attributes: ['class_id']
    }).then(enrollments => enrollments.map(e => e.class_id));

    // Get all classes except the ones already enrolled
    const availableClasses = await Class.findAll({
      where: {
        id: { [require('sequelize').Op.notIn]: enrolledClassIds }
      },
      include: [
        { model: Course, as: 'course', attributes: ['title', 'stream'] },
        { model: User, as: 'lecturer', attributes: ['name', 'email'] }
      ],
      order: [['name', 'ASC']]
    });

    const result = availableClasses.map(cls => ({
      id: cls.id,
      name: cls.name,
      course_name: cls.course?.title || 'Unknown',
      stream: cls.course?.stream || 'Unknown',
      lecturer_name: cls.lecturer?.name || 'Unassigned',
      lecturer_email: cls.lecturer?.email || '',
      total_students: cls.total_students,
      schedule: cls.schedule,
      module: cls.module
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching available classes:', err);
    res.status(500).json({ error: err.message });
  }
};
