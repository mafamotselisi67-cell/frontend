const { User, Class, Course } = require('../models/index');

exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await User.findAll({
      where: { role: 'lecturer' },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Class,
          as: 'classes',
          include: [
            {
              model: Course,
              as: 'course',
              attributes: ['title'],
            },
          ],
          attributes: ['module'],
        },
      ],
    });

    // Transform data to include modules
    const lecturersWithModules = lecturers.map(lecturer => ({
      id: lecturer.id,
      name: lecturer.name,
      email: lecturer.email,
      modules: lecturer.classes.map(cls => cls.module || cls.course?.title || 'No module').filter(Boolean),
    }));

    res.json(lecturersWithModules);
  } catch (err) {
    console.error('Error fetching lecturers:', err);
    res.status(500).json({ error: 'Failed to fetch lecturers' });
  }
};
