const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const attendanceRoutes = require("./routes/attendanceRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());

// Routes
app.use("/attendance", attendanceRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Attendance API is running..." });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
