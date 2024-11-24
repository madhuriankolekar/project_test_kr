const express = require('express');
const { getInstructorAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/instructor', protect, getInstructorAnalytics);

module.exports = router;
