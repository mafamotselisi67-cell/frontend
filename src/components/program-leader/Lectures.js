// const express = require('express');
// const db = require('../config/database');
// const router = express.Router();

// // Fetch lecturer’s reports
// router.get('/reports/:lecturerId', (req, res) => {
//   const { lecturerId } = req.params;
//   db.query(
//     'SELECT * FROM reports WHERE lecturer_id = ?',
//     [lecturerId],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json(results);
//     }
//   );
// });

// // Add a new report
// router.post('/reports', (req, res) => {
//   const { lecturer_id, course_id, report_title, report_content } = req.body;
//   db.query(
//     'INSERT INTO reports (lecturer_id, course_id, report_title, report_content) VALUES (?, ?, ?, ?)',
//     [lecturer_id, course_id, report_title, report_content],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ message: 'Report submitted successfully', id: result.insertId });
//     }
//   );
// });

// module.exports = router;
