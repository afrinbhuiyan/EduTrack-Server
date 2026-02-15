const Schedule = require('../models/schedules');

// Get all schedules for user
exports.getSchedules = async (req, res) => {
  try {
    console.log('=== GET ALL SCHEDULES ===');
    console.log('User ID:', req.user.id);
    
    // Check ALL schedules in database
    const allSchedules = await Schedule.find({}).lean();
    console.log('ALL schedules in database:', JSON.stringify(allSchedules, null, 2));
    
    // Now get user's schedules
    const schedules = await Schedule.find({ userId: req.user.id }).lean();
    
    console.log(`Schedules found for user ${req.user.id}:`, schedules.length);
    console.log('User schedules:', JSON.stringify(schedules, null, 2));
    console.log('=== END GET ALL SCHEDULES ===');
    
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create new schedule
exports.createSchedule = async (req, res) => {
  try {
    console.log('=== CREATE SCHEDULE ===');
    console.log('Request body received:', JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    const { subject, day, startTime, endTime } = req.body;
    
    if (!subject || !day || !startTime || !endTime) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['subject', 'day', 'startTime', 'endTime'],
        received: req.body
      });
    }
    
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!validDays.includes(day)) {
      return res.status(400).json({ 
        message: `Invalid day: ${day}. Must be one of: ${validDays.join(', ')}`
      });
    }
    
    // Create schedule but FORCE userId to be the authenticated user's ID
    const schedule = new Schedule({
      ...req.body,
      userId: req.user.id  // Always use authenticated user's ID, don't trust frontend
    });
    
    console.log('Schedule object before save:', JSON.stringify(schedule.toObject ? schedule.toObject() : schedule, null, 2));
    
    const savedSchedule = await schedule.save();
    
    console.log('Schedule saved to DB:', JSON.stringify(savedSchedule.toObject(), null, 2));
    
    const responseData = savedSchedule.toObject();
    console.log('Response data being sent to frontend:', JSON.stringify(responseData, null, 2));
    console.log('=== END CREATE SCHEDULE ===');
    
    // Return the saved document (ensures all fields are included)
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error creating schedule:', error.message);
    res.status(400).json({ 
      message: error.message,
      details: error.errors
    });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    console.log('=== UPDATE SCHEDULE ===');
    console.log('Schedule ID:', req.params.id);
    console.log('User ID:', req.user.id);
    console.log('Update data received:', JSON.stringify(req.body, null, 2));
    
    // Remove _id, userId, and createdAt from update data (don't allow frontend to change these)
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.userId;
    delete updateData.createdAt;
    delete updateData.__v;
    
    // Always use the authenticated user's ID
    updateData.userId = req.user.id;
    
    console.log('Sanitized update data:', JSON.stringify(updateData, null, 2));
    
    const schedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    console.log('Updated schedule:', JSON.stringify(schedule, null, 2));
    console.log('=== END UPDATE SCHEDULE ===');
    
    if (!schedule) {
      console.log('Schedule not found!');
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    console.error('Error updating schedule:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get specific schedule
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).lean();
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    console.log('=== DELETE SCHEDULE ===');
    console.log('Schedule ID:', req.params.id);
    console.log('User ID:', req.user.id);
    
    const schedule = await Schedule.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!schedule) {
      console.log('Schedule not found for deletion!');
      return res.status(404).json({ message: 'Schedule not found' });
    }
    
    console.log('Deleted schedule:', JSON.stringify(schedule, null, 2));
    console.log('=== END DELETE SCHEDULE ===');
    
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Bulk import schedules
exports.bulkImport = async (req, res) => {
  try {
    const { schedules } = req.body;
    
    if (!Array.isArray(schedules)) {
      return res.status(400).json({ message: 'Schedules must be an array' });
    }
    
    // Add userId to each schedule - FORCE backend user ID, don't trust frontend
    const schedulesWithUser = schedules.map(schedule => {
      const cleanSchedule = { ...schedule };
      delete cleanSchedule._id;  // Remove _id if exists
      cleanSchedule.userId = req.user.id;  // Always use authenticated user's ID
      return cleanSchedule;
    });
    
    const createdSchedules = await Schedule.insertMany(schedulesWithUser);
    
    // Convert to plain objects to ensure all fields are returned
    const plainSchedules = createdSchedules.map(doc => doc.toObject ? doc.toObject() : doc);
    
    res.status(201).json({
      message: `${createdSchedules.length} schedules imported successfully`,
      schedules: plainSchedules
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};