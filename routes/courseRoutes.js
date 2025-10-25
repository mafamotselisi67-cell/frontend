const express = require('express');
const router = express.Router();
const {
  getCoursesByPL,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  assignLecturerModule,
  getCoursesAndLecturesByStream
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/pl/:plId', getCoursesByPL);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.put('/:id/assign', assignLecturerModule);
router.get('/stream/:stream', getCoursesAndLecturesByStream);

module.exports = router;
