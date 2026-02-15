const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const auth = require('../middleware/auth');

router.use(auth);

// Get all schedules for user
router.get('/', scheduleController.getSchedules);

// Get specific schedule
router.get('/:id', scheduleController.getScheduleById);

// Create new schedule
router.post('/', scheduleController.createSchedule);

// Bulk import schedules
router.post('/bulk-import', scheduleController.bulkImport);

// Update schedule
router.put('/:id', scheduleController.updateSchedule);

// Delete schedule
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;