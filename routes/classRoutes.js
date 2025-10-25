const express = require('express');
const router = express.Router();
const { getAllClasses, createClass, assignLecturerToClass, getClassesByLecturer, getAvailableClasses, enrollStudentInClass, getStudentClasses, updateClass, deleteClass } = require('../controllers/classController');

router.get('/', getAllClasses);
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);
router.put('/:id/assign-lecturer', assignLecturerToClass);
router.get('/lecturer/:id', getClassesByLecturer);
router.get('/available/:studentId', getAvailableClasses);
router.post('/enroll/:classId', enrollStudentInClass);
router.get('/student/:studentId', getStudentClasses);

module.exports = router;
