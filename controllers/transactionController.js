const Transaction = require("../models/Transaction");

// Add new transaction
exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      userId: req.user.id, // assuming auth middleware sets req.user
      ...req.body
    });
    const savedTx = await transaction.save();
    res.status(201).json(savedTx);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction", error });
  }
};

// Get transactions (optionally filtered by type)
exports.getTransactions = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { userId: req.user.id };
    if (type) filter.type = type;
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTx = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTx) return res.status(404).json({ message: "Transaction not found" });
    res.json(updatedTx);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTx = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedTx) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error });
  }
};
