const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/COURSE', protect, createCourse);
router.get('/', getCourses);

module.exports = router;
