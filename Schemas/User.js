const mongoose = require("mongoose");
const Department = require("./Department");
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    mobileNumber: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: "department", required: false },
    role: String,
    imgUrl: String,
    academicYear: String,
    isActive: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
