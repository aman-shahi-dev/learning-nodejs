const Student = require("../models/student.models");

async function handleGetAllStudents(req, res) {
  const students = await Student.find({});

  if (!students) {
    return res.status(404).json({
      message: "no students enrolled",
    });
  }

  return res.status(200).json({
    message: "students fetched successfully!!!",
    students,
  });
}

async function handleCreateNewStudentEntry(req, res) {
  const { name, email } = req.body;

  const newUser = await Student.create({ name, email });
  if (!newUser) {
    return res.status(404).json({
      message: "error while creating student entry",
    });
  }

  return res.status(201).json({
    message: "student entry successfull!!!",
    id: newUser._id,
  });
}

async function handleUpdateStudentEntry(req, res) {
  const { name } = req.body;
  const user = await Student.findByIdAndUpdate(
    req.params.id,
    { name: name },
    { new: true },
  );

  return res.status(200).json({
    message: "user updated succssfully",
    user,
  });
}

async function handleDeleteStudentEntry(req, res) {
  await Student.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: "user deleted successfully",
  });
}

module.exports = {
  handleGetAllStudents,
  handleCreateNewStudentEntry,
  handleUpdateStudentEntry,
  handleDeleteStudentEntry,
};
