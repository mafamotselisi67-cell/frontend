const { Course, Class, User } = require('../models/index');

exports.getCoursesByPL = async (req, res) => {
  const { plId } = req.params;
  const courses = await Course.findAll({ where: { created_by: plId } });
  res.json(courses);
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'title', 'description', 'stream'],
      order: [['title', 'ASC']],
    });
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, stream, created_by } = req.body;
  const course = await Course.create({ title, description, stream, created_by });
  res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await Course.update(updates, { where: { id } });
  res.json({ message: 'Course updated' });
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  await Course.destroy({ where: { id } });
  res.json({ message: 'Course deleted' });
};

exports.assignLecturerModule = async (req, res) => {
  const { id } = req.params;
  const { lecturer_id, module } = req.body;
  await Course.update({ lecturer_id, module }, { where: { id } });
  res.json({ message: 'Lecturer and module assigned' });
};

exports.getCoursesAndLecturesByStream = async (req, res) => {
  try {
    const { stream } = req.params;

    // Get all courses under the stream
    const courses = await Course.findAll({
      where: { stream },
      include: [
        {
          model: Class,
          as: 'classes',
          include: [
            { model: User, as: 'lecturer', attributes: ['name', 'email'] }
          ]
        }
      ],
      order: [['title', 'ASC']]
    });

    // Format the response
    const result = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      stream: course.stream,
      created_by: course.created_by,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      lectures: course.classes.map(cls => ({
        id: cls.id,
        name: cls.name,
        lecturer_name: cls.lecturer?.name || 'Unassigned',
        lecturer_email: cls.lecturer?.email || '',
        total_students: cls.total_students,
        schedule: cls.schedule,
        module: cls.module
      }))
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching courses and lectures by stream:', err);
    res.status(500).json({ error: 'Failed to fetch courses and lectures' });
  }
};
