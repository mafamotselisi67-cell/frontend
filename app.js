const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const Rating = require('./models/Rating'); // ✅ Import Rating model
const Feedback = require('./models/Feedback'); // ✅ Import Feedback model
const Class = require('./models/Class'); // ✅ Import Class model
const StudentClass = require('./models/StudentClass'); // ✅ Import StudentClass model

// ✅ Route Imports
const authRoutes = require('./routes/authRoutes');
const plRoutes = require('./routes/plRoutes');
const courseRoutes = require('./routes/courseRoutes');
const reportRoutes = require('./routes/reportRoutes');
const classRoutes = require('./routes/classRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const studentRoutes = require('./routes/studentRoutes');

// ✅ Initialize Express BEFORE using app.use
const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pl', plRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/lecturers', lecturerRoutes); // ✅ Now safe to use
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/students', studentRoutes);

// ✅ Sync database and start server
sequelize.sync().then(() => {
  StudentClass.sync({ alter: true })
    .then(() => console.log('StudentClass table updated'))
    .catch(err => console.error('StudentClass sync error:', err));

  app.listen(5000, () => console.log('Server running on port 5000'));
});
