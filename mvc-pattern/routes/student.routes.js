const express = require("express");
const Student = require("../models/student.models");
const {
  handleGetAllStudents,
  handleCreateNewStudentEntry,
  handleDeleteStudentEntry,
  handleUpdateStudentEntry,
} = require("../controllers/student");

const router = express.Router();

router.route("/").get(handleGetAllStudents).post(handleCreateNewStudentEntry);

router
  .route("/:id")
  .patch(handleUpdateStudentEntry)
  .delete(handleDeleteStudentEntry);

module.exports = router;
