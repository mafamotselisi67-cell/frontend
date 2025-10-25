const express = require('express');
const router = express.Router();
const { getLecturerMonitoring, getAllMonitoring, getMonitoringOverview, getStudentMonitoring } = require('../controllers/monitoringController');

router.get('/lecturer/:id', getLecturerMonitoring);
router.get('/student/:id', getStudentMonitoring);
router.get('/', getAllMonitoring);
router.get('/overview', getMonitoringOverview);

module.exports = router;
