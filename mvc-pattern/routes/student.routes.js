const express = require("express");
const Student = require("../models/student.models");
const {
  handleGetAllStudents,
  handleCreateNewStudentEntry,
} = require("../controllers/student");

const router = express.Router();

router.route("/").get(handleGetAllStudents).post(handleCreateNewStudentEntry);

module.exports = router;
