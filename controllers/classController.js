const { Class, Course, User, StudentClass } = require('../models/index');

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [
        { model: Course, as: 'course', attributes: ['title'] },
        { model: User, as: 'lecturer', attributes: ['name'] }
      ],
    });

    // Get enrollment counts for each class
    const classIds = classes.map(cls => cls.id);
    const enrollmentCounts = await StudentClass.findAll({
      where: { class_id: classIds },
      attributes: [
        'class_id',
        [require('sequelize').fn('COUNT', require('sequelize').col('student_id')), 'enrolled_count']
      ],
      group: ['class_id']
    });

    // Create a map of class_id to enrolled count
    const enrollmentMap = {};
    enrollmentCounts.forEach(count => {
      enrollmentMap[count.class_id] = parseInt(count.dataValues.enrolled_count);
    });

    const result = classes.map(cls => ({
      id: cls.id,
      name: cls.name,
      course_name: cls.course?.title || 'Unknown',
      lecturer_name: cls.lecturer?.name || 'Unassigned',
      total_students: enrollmentMap[cls.id] || 0,
      schedule: cls.schedule,
      module: cls.module,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { name, course_id, lecturer_id, total_students, schedule, module } = req.body;

    const newClass = await Class.create({
      name,
      course_id,
      lecturer_id,
      total_students,
      schedule,
      module,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignLecturerToClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { lecturer_id } = req.body;

    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }

    classInstance.lecturer_id = lecturer_id;
    await classInstance.save();

    res.json({ message: 'Lecturer assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassesByLecturer = async (req, res) => {
  try {
    const lecturerId = req.params.id;
    const classes = await Class.findAll({
      where: { lecturer_id: lecturerId },
      include: [
        { model: Course, as: 'course', attributes: ['title', 'stream'] },
      ],
    });

    const result = classes.map(cls => ({
      id: cls.id,
      name: cls.name,
      course_name: cls.course?.title || 'Unknown',
      stream: cls.course?.stream || 'Unknown',
      student_count: cls.total_students,
      module: cls.module,
      schedule: cls.schedule,
    }));

    res.json(result);
  } catch (err) {
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

exports.enrollStudentInClass = async (req, res) => {
  try {
    const { student_id, class_id } = req.body;
    console.log('Enrolling student_id:', student_id, 'in class_id:', class_id);

    // Check if student exists and is a student
    const student = await User.findByPk(student_id);
    console.log('Found student:', student ? { id: student.id, role: student.role, name: student.name } : 'null');
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

    res.status(201).json(enrollment);
  } catch (err) {
    console.error('Error enrolling student:', err);
    res.status(500).json({ error: err.message });
  }
};

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

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }

    await classInstance.update(updates);
    res.json({ message: 'Class updated successfully' });
  } catch (err) {
    console.error('Error updating class:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }

    await classInstance.destroy();
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    console.error('Error deleting class:', err);
    res.status(500).json({ error: err.message });
  }
};
