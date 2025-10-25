// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const db = require('./config/database'); // Import database connection

// // Import routes correctly
// const authRoutes = require('./routes/auth');
// const lecturerRoutes = require('./routes/lecturer');
// const ratingRoutes = require('./routes/ratings');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/lecturer', lecturerRoutes);
// app.use('/api/ratings', ratingRoutes);

// // Test route to verify server is working
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend server is working!' });
// });

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`📍 Test server: http://localhost:${PORT}/api/test`);
// });