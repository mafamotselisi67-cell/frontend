const { Report } = require('../models/index');

exports.createReport = async (req, res) => {
  try {
    const {
      faculty_name,
      class_name,
      week,
      date_of_lecture,
      course_name,
      course_code,
      lecturer_name,
      actual_students,
      total_students,
      venue,
      scheduled_time,
      topic,
      outcomes,
      recommendations,
      submitted_by,
      class_id,
    } = req.body;

    const report = await Report.create({
      faculty_name,
      class_name,
      week,
      date_of_lecture,
      course_name,
      course_code,
      lecturer_name,
      actual_students,
      total_students,
      venue,
      scheduled_time,
      topic,
      outcomes,
      recommendations,
      submitted_by,
      class_id,
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("Report creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      attributes: [
        'id',
        'faculty_name',
        'class_name',
        'week',
        'date_of_lecture',
        'course_name',
        'course_code',
        'lecturer_name',
        'actual_students',
        'total_students',
        'venue',
        'scheduled_time',
        'topic',
        'outcomes',
        'recommendations',
        'content',
        'feedback',
        'created_at'
      ],
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getLecturerReports = async (req, res) => {
  try {
    const lecturerId = req.params.id;
    const reports = await Report.findAll({
      where: { submitted_by: lecturerId },
      attributes: ['id', 'course_name', 'lecturer_name', 'outcomes', 'date_of_lecture', 'topic', 'actual_students', 'total_students', 'created_at'],
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching lecturer reports:", err);
    res.status(500).json({ error: err.message });
  }
};
