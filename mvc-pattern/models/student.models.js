const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
