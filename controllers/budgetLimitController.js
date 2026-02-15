const BudgetLimit = require("../models/BudgetLimit");

// Add / Update limit
exports.setLimit = async (req, res) => {
  try {
    const { category, limit } = req.body;
    let budgetLimit = await BudgetLimit.findOne({ userId: req.user.id, category });

    if (budgetLimit) {
      budgetLimit.limit = limit;
    } else {
      budgetLimit = new BudgetLimit({ userId: req.user.id, category, limit });
    }

    const savedLimit = await budgetLimit.save();
    res.json(savedLimit);
  } catch (error) {
    res.status(500).json({ message: "Failed to set budget limit", error });
  }
};

// Get all limits
exports.getLimits = async (req, res) => {
  try {
    const limits = await BudgetLimit.find({ userId: req.user.id });
    res.json(limits);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget limits", error });
  }
};

// Delete limit
exports.deleteLimit = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLimit = await BudgetLimit.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedLimit) return res.status(404).json({ message: "Limit not found" });
    res.json({ message: "Budget limit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget limit", error });
  }
};
