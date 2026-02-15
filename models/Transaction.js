const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  note: { type: String, default: "" },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  recurring: { type: Boolean, default: false },
  location: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
