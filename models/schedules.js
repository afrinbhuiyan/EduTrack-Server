const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  startTime: {
    type: String,  // "04:00 PM"
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/  // Validation for time format
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  instructor: {  // Changed from 'teacher' to match frontend
    type: String,
    trim: true
  },
  room: {  // Changed from 'location' to match frontend
    type: String,
    trim: true
  },
  type: {  // NEW: Class type
    type: String,
    enum: ['Lecture', 'Lab', 'Tutorial', 'Practical', 'Seminar', 'Workshop'],
    default: 'Lecture'
  },
  color: {
    type: String,
    default: '#3B82F6',
    match: /^#[A-Fa-f0-9]{6}$/  // Validate hex color
  },
  recurring: {
    type: Boolean,
    default: true
  },
  description: String,  // Optional: class description
  capacity: Number,     // Optional: room capacity
  status: {  // Optional: Active/Inactive
    type: String,
    enum: ['active', 'cancelled', 'postponed'],
    default: 'active'
  }
}, {
  timestamps: true,
  strict: false  // Allow extra fields from frontend
});

// Add index for better query performance
scheduleSchema.index({ userId: 1, day: 1 });
scheduleSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Schedule', scheduleSchema);