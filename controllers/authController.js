const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwtUtils.generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

  
    const token = jwtUtils.generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};


