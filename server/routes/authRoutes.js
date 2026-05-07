const express = require('express');
const router = express.Router();
const { registerUser, loginUser, saveConfiguration } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import middleware

router.post('/register', registerUser);
router.post('/login', loginUser);

// Apply the 'protect' middleware to this specific route 
router.post('/save-config', protect, saveConfiguration);

module.exports = router;