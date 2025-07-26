const express = require("express");
const departmentController = express.Router();
const Department = require("../Schemas/Department");

departmentController.post("/", async (req, resp) => {
  let department = new Department(req.body);
  let result = await department.save();
  console.log(req.body);
  resp.send(result);
});
departmentController.get("/", async (req, resp) => {
  let departments = await Department.find();

  resp.send(departments);
});

module.exports = departmentController;
