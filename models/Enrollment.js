const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  completionRate: { type: Number, default: 0 },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
