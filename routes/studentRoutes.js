const express = require('express');
const router = express.Router();
const {
  getStudentClasses,
  enrollStudentInClass,
  unenrollStudentFromClass,
  getAvailableClasses
} = require('../controllers/studentController');

router.get('/classes/:studentId', getStudentClasses);
router.get('/available-classes/:studentId', getAvailableClasses);
router.post('/enroll', enrollStudentInClass);
router.delete('/unenroll/:studentId/:classId', unenrollStudentFromClass);

module.exports = router;
