const express = require('express');
const router = express.Router();
const { getPLDashboard, assignStudentToClass, getAllStudents } = require('../controllers/plController');

router.get('/dashboard/:plId', getPLDashboard);
router.post('/assign-student', assignStudentToClass);
router.get('/students', getAllStudents);

module.exports = router;
