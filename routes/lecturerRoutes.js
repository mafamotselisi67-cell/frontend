const express = require('express');
const router = express.Router();
const { getAllLecturers } = require('../controllers/lecturerController');

router.get('/', getAllLecturers);

module.exports = router;