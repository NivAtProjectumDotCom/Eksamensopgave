const express = require("express");
const app = express();

// Controllers
// Users
const userController = require("./src/controllers/user-controller");
const adsController = require("./src/controllers/ads-controller");
// const adminController = require("./src/controllers/admin-controller");  


const PORT = process.env.PORT || 3050;
// const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static("./src/views"));
// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userController);
app.use("/ads", adsController);
// app.use("/admin, adminController");


// Start server
app.listen(PORT, console.log(`Server is live on http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send('Hello World! Let go bratha')
  })   




