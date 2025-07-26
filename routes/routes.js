const express = require("express");
const authController = require("../controllers/authController");
const departmentController = require("../controllers/departmentController");
const routes = express.Router();

routes.use("/auth", authController);
routes.use("/departments", departmentController);

module.exports = routes;
