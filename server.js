const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const transactionRoutes = require("./routes/transactionRoutes");
const budgetGoalRoutes = require("./routes/budgetGoalRoutes");
const budgetLimitRoutes = require("./routes/budgetLimitRoutes");
const scheduleRoutes = require("./routes/schedules");

app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", budgetGoalRoutes);
app.use("/api/limits", budgetLimitRoutes);
app.use("/api/schedules", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("EduTrack server running!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
