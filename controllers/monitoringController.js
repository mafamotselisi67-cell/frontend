const { Monitoring, Class, Course, Report, StudentClass, User } = require('../models/index');

exports.getLecturerMonitoring = async (req, res) => {
  try {
    const lecturerId = req.params.id;
    const classes = await Class.findAll({
      where: { lecturer_id: lecturerId },
      include: [{ model: Course, attributes: ['title'] }]
    });

    const overview = await Promise.all(classes.map(async (cls) => {
      const stats = await Monitoring.findOne({ where: { class_id: cls.id, user_id: lecturerId } });
      return {
        class_id: cls.id,
        class_name: cls.name,
        course_name: cls.Course?.title || 'Unknown',
        attendance_rate: stats?.attendance_rate || 0,
        feedback_count: stats?.feedback_count || 0,
        total_students: cls.total_students || 0,
      };
    }));

    // Calculate overall metrics
    const totalClasses = overview.length;
    const totalStudents = overview.reduce((sum, cls) => sum + cls.total_students, 0);
    const avgAttendance = totalClasses > 0 ? overview.reduce((sum, cls) => sum + cls.attendance_rate, 0) / totalClasses : 0;
    const totalFeedback = overview.reduce((sum, cls) => sum + cls.feedback_count, 0);

    const overall = {
      totalClasses,
      totalStudents,
      avgAttendance: Math.round(avgAttendance * 100) / 100,
      totalFeedback,
      classes: overview
    };

    res.json(overall);
  } catch (err) {
    console.error('Error fetching monitoring data:', err);
    res.status(500).json({ error: 'Failed to fetch monitoring data' });
  }
};

exports.getAllMonitoring = async (req, res) => {
  try {
    const monitoringData = await Monitoring.findAll({
      include: [{
        model: Class,
        as: 'Class',
        include: [{ model: Course, as: 'course', attributes: ['title'] }]
      }],
      order: [['created_at', 'DESC']]
    });

    const overview = monitoringData.map(item => ({
      class_id: item.class_id,
      class_name: item.Class?.course?.title || 'Unknown',
      attendance_rate: item.attendance_rate || 0,
      feedback_count: item.feedback_count || 0,
      created_at: item.created_at
    }));

    res.json(overview);
  } catch (err) {
    console.error('Error fetching all monitoring data:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMonitoringOverview = async (req, res) => {
  try {
    const classesCount = await Class.count();
    const coursesCount = await Course.count();
    const reportsCount = await Report.count();

    res.json({
      classes: classesCount,
      courses: coursesCount,
      reports: reportsCount
    });
  } catch (err) {
    console.error('Error fetching monitoring overview:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentMonitoring = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Get classes the student is enrolled in
    const enrollments = await StudentClass.findAll({
      where: { student_id: studentId },
      include: [{
        model: Class,
        as: 'class',
        include: [
          { model: Course, as: 'course', attributes: ['title'] },
          { model: User, as: 'lecturer', attributes: ['name'] }
        ]
      }],
      order: [['enrolled_at', 'DESC']]
    });

    const monitoringData = await Promise.all(enrollments.map(async (enrollment) => {
      const cls = enrollment.class;
      const stats = await Monitoring.findOne({ where: { class_id: cls.id } });

      return {
        date: enrollment.enrolled_at.toISOString().split('T')[0], // Format date
        course_name: cls.course?.title || 'Unknown',
        lecturer_name: cls.lecturer?.name || 'Unassigned',
        attendance: stats?.attendance_rate || 0,
        performance: 'N/A', // Placeholder, as performance might be from ratings or other data
        remarks: stats?.feedback_count ? `${stats.feedback_count} feedback(s)` : 'No remarks'
      };
    }));

    res.json(monitoringData);
  } catch (err) {
    console.error('Error fetching student monitoring data:', err);
    res.status(500).json({ error: 'Failed to fetch student monitoring data' });
  }
};
