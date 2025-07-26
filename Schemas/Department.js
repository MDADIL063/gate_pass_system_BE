const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("departments", departmentSchema);
