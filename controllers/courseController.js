const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    course.instructor = req.user.id;
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { category, price, rating, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (price) filters.price = { $lte: price };
    if (rating) filters.rating = { $gte: rating };

    const courses = await Course.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
