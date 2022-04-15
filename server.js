const express = require("express");
const app = express();

// Controllers
// Users
const userController = require("./src/controller/user-controllers");


const PORT = process.env.PORT || 3050;

// Middleware
app.use(express.static("./src/views"));
// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userController);

// Start server
app.listen(PORT, console.log(`Server is live on http://localhost:${PORT}`));







