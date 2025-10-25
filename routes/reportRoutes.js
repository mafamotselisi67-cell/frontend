const express = require('express');
const router = express.Router();
const { createReport, getAllReports, getLecturerReports } = require('../controllers/reportController');

router.post('/', createReport);
router.get('/', getAllReports);
router.get('/lecturer/:id', getLecturerReports);

module.exports = router;
