const { Rating, User, Course } = require('../models/index');

// ✅ Create a new rating
exports.createRating = async (req, res) => {
  try {
    const { rater_id, lecturer_id, course_id, score, comments } = req.body;

    if (!rater_id || !lecturer_id || !course_id || !score) {
      return res.status(400).json({ error: 'Missing required fields: rater_id, lecturer_id, course_id, score' });
    }

    // Get lecturer name from User table
    const lecturer = await User.findByPk(lecturer_id);
    if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
    }

    const newRating = await Rating.create({
      rater_id,
      lecturer_id,
      course_id,
      lecturer_name: lecturer.name,
      score,
      comments,
    });

    res.status(201).json(newRating);
  } catch (err) {
    console.error('Error creating rating:', err);
    res.status(500).json({ error: 'Server error while saving rating' });
  }
};

// ✅ Get all ratings (for PRL dashboard)
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ['id', 'lecturer_id', 'course_id', 'lecturer_name', 'score', 'comments', 'created_at'],
      include: [
        { model: User, as: 'student', attributes: ['name'] },
        { model: Course, attributes: ['title'] },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json(ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

// ✅ Get ratings summary (for PL dashboard)
exports.getRatingsSummary = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ['score', 'lecturer_name'],
    });

    if (ratings.length === 0) {
      return res.json({
        average: '0.0',
        topLecturer: 'No ratings yet',
        total: 0,
        scoreDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    const total = ratings.length;
    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    const average = (sum / total).toFixed(1);

    // Calculate score distribution
    const scoreDistribution = ratings.reduce((acc, r) => {
      acc[r.score] = (acc[r.score] || 0) + 1;
      return acc;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    // Find top lecturer
    const lecturerScores = ratings.reduce((acc, r) => {
      if (!acc[r.lecturer_name]) {
        acc[r.lecturer_name] = { sum: 0, count: 0 };
      }
      acc[r.lecturer_name].sum += r.score;
      acc[r.lecturer_name].count += 1;
      return acc;
    }, {});

    let topLecturer = 'No ratings yet';
    let highestAvg = 0;
    for (const [name, data] of Object.entries(lecturerScores)) {
      const avg = data.sum / data.count;
      if (avg > highestAvg) {
        highestAvg = avg;
        topLecturer = name;
      }
    }

    res.json({
      average,
      topLecturer,
      total,
      scoreDistribution
    });
  } catch (err) {
    console.error('Error fetching ratings summary:', err);
    res.status(500).json({ error: 'Failed to fetch ratings summary' });
  }
};

// ✅ Get ratings by lecturer (for PL dashboard)
exports.getRatingsByLecturer = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ['lecturer_name', 'score'],
    });

    const lecturerStats = ratings.reduce((acc, r) => {
      if (!acc[r.lecturer_name]) {
        acc[r.lecturer_name] = { scores: [], count: 0 };
      }
      acc[r.lecturer_name].scores.push(r.score);
      acc[r.lecturer_name].count += 1;
      return acc;
    }, {});

    const result = Object.entries(lecturerStats).map(([name, data]) => {
      const average = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      return {
        lecturer_name: name,
        average_score: average.toFixed(1),
        feedback_count: data.count,
        scores: data.scores
      };
    }).sort((a, b) => parseFloat(b.average_score) - parseFloat(a.average_score));

    res.json(result);
  } catch (err) {
    console.error('Error fetching lecturer ratings:', err);
    res.status(500).json({ error: 'Failed to fetch lecturer ratings' });
  }
};

// ✅ Get ratings by lecturer ID (for Lecturer dashboard)
exports.getRatingsByLecturerId = async (req, res) => {
  try {
    const lecturerId = req.params.id;

    // Get the lecturer's name from User table
    const lecturer = await User.findByPk(lecturerId);
    if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
    }

    const ratings = await Rating.findAll({
      where: { lecturer_name: lecturer.name },
      include: [
        { model: Course, attributes: ['title'] },
        { model: User, as: 'student', attributes: ['name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    const result = ratings.map(r => ({
      id: r.id,
      student_name: r.student?.name || 'Unknown',
      course_name: r.Course?.title || 'Unknown',
      score: r.score,
      comments: r.comments || '',
      created_at: r.created_at
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching lecturer ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

// ✅ Get ratings by student ID (for Student dashboard)
exports.getRatingsByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;

    const ratings = await Rating.findAll({
      where: { rater_id: studentId },
      include: [
        { model: Course, attributes: ['title'] },
        { model: User, as: 'lecturer', attributes: ['name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    const result = ratings.map(r => ({
      id: r.id,
      lecturer_name: r.lecturer?.name || 'Unknown',
      course_name: r.Course?.title || 'Unknown',
      score: r.score,
      comments: r.comments || '',
      created_at: r.created_at
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching student ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};
