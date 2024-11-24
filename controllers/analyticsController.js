const Enrollment = require('../models/Enrollment');

exports.getInstructorAnalytics = async (req, res) => {
  try {
    const analytics = await Enrollment.aggregate([
      { $match: { instructor: req.user.id } },
      {
        $group: {
          _id: '$course',
          totalEnrollments: { $sum: 1 },
          averageCompletion: { $avg: '$completionRate' },
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
