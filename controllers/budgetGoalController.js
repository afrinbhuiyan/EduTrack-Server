const BudgetGoal = require("../models/BudgetGoal");

// Add new goal
exports.addGoal = async (req, res) => {
  try {
    const goal = new BudgetGoal({ userId: req.user.id, ...req.body });
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: "Failed to add goal", error });
  }
};

// Get all goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await BudgetGoal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch goals", error });
  }
};

// Complete goal
exports.completeGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGoal = await BudgetGoal.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { completed: true },
      { new: true }
    );
    if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: "Failed to complete goal", error });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await BudgetGoal.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedGoal) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete goal", error });
  }
};
