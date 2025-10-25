const { Feedback, User } = require('../models/index');

// ✅ Create a new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { sender_id, recipient_id, role, message } = req.body;

    if (!sender_id || !recipient_id || !role || !message) {
      return res.status(400).json({ error: 'Missing required fields: sender_id, recipient_id, role, message' });
    }

    const newFeedback = await Feedback.create({
      sender_id,
      recipient_id,
      role,
      message,
    });

    res.status(201).json(newFeedback);
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({ error: 'Server error while saving feedback' });
  }
};

// ✅ Get all feedback (for PRL dashboard)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['name'] },
        { model: User, as: 'recipient', attributes: ['name'] },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json(feedback);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
