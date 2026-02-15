const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const budgetLimitController = require("../controllers/budgetLimitController");

// All routes require authentication
router.use(auth);

// Add or update a limit
router.post("/", budgetLimitController.setLimit);

// Get all limits
router.get("/", budgetLimitController.getLimits);

// Delete a limit
router.delete("/:id", budgetLimitController.deleteLimit);

module.exports = router;
