const User = require('../models/User'); // Standardized to capital 'U'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a user's car configuration
// @route   POST /api/auth/save-config
// @access  Private (Requires Token)
const saveConfiguration = async (req, res) => {
  try {
    const { color, modelName, basePrice, details } = req.body;

    const newConfig = {
      modelName,
      color,
      basePrice,
      details,
      savedAt: new Date()
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { savedConfigurations: newConfig } },
      { new: true, runValidators: false } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ 
      message: 'Configuration saved successfully!', 
      config: newConfig 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ONE single export at the bottom
module.exports = {
  registerUser,
  loginUser,
  saveConfiguration, 
};