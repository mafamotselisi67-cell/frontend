const express = require('express');
const router = express.Router();

const {
  createRating,
  getAllRatings,
  getRatingsSummary,
  getRatingsByLecturer,
  getRatingsByLecturerId,
  getRatingsByStudentId
} = require('../controllers/ratingController');

router.post('/', createRating);
router.get('/', getAllRatings); // PRL view
router.get('/summary', getRatingsSummary); // PL view - summary with charts
router.get('/by-lecturer', getRatingsByLecturer); // PL view - lecturer rankings
router.get('/lecturer/:id', getRatingsByLecturerId); // Lecturer view
router.get('/student/:id', getRatingsByStudentId); // Student view

module.exports = router;
