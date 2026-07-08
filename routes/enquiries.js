const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createEnquiry, getEnquiries, updateEnquiry, deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

const enquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('mobile').matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('productRequired').trim().notEmpty().withMessage('Please specify the product required'),
  body('message').optional().isLength({ max: 1000 }).withMessage('Message too long')
];

// Public
router.post('/', enquiryValidation, createEnquiry);

// Admin protected
router.get('/', protect, getEnquiries);
router.put('/:id', protect, updateEnquiry);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
