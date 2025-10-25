const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// ✅ POST /api/feedback - Create new feedback
router.post('/', feedbackController.createFeedback);

// ✅ GET /api/feedback - Get all feedback
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
