const mongoose = require("mongoose");

const budgetGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("BudgetGoal", budgetGoalSchema);
