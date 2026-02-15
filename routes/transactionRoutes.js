const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const transactionController = require("../controllers/transactionController");

// All routes require authentication
router.use(auth);

// Add new transaction
router.post("/", transactionController.addTransaction);

// Get all transactions (optionally filtered by type)
router.get("/", transactionController.getTransactions);

// Update transaction
router.put("/:id", transactionController.updateTransaction);

// Delete transaction
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
