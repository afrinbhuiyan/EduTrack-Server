const mongoose = require("mongoose");

const budgetLimitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("BudgetLimit", budgetLimitSchema);
