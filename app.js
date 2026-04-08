const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/database"); // Assuming you put database.js in /config
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));