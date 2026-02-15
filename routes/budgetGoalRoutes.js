const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const budgetGoalController = require("../controllers/budgetGoalController");

// All routes require authentication
router.use(auth);

// Add new goal
router.post("/", budgetGoalController.addGoal);

// Get all goals
router.get("/", budgetGoalController.getGoals);

// Complete a goal
router.patch("/complete/:id", budgetGoalController.completeGoal);

// Delete a goal
router.delete("/:id", budgetGoalController.deleteGoal);

module.exports = router;
