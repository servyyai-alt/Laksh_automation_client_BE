const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [100, 'City cannot exceed 100 characters']
  },
  productRequired: {
    type: String,
    required: [true, 'Product required field is required'],
    trim: true
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'closed'],
    default: 'new'
  },
  adminNotes: { type: String },
  emailSent: { type: Boolean, default: false },
  source: { type: String, default: 'website' }
}, {
  timestamps: true
});

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ mobile: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
