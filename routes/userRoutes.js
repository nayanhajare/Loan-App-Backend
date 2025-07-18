const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const User = require('../models/User');

// GET /users - admin only
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 