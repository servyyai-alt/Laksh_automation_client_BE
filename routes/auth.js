const express = require('express');
const router = express.Router();
const { login, getMe, setup } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/setup', setup); // Run once to create first admin

module.exports = router;
