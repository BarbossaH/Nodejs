const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudentById,
  getStudentById,
} = require('../../controller/stuController');

const stuData = {};
stuData.students = require('../../model/students.json');

// console.log(typeof stuData.students);

router.route('/').get(getAllStudents).post(addStudent);

router
  .route('/:id')
  .get(getStudentById)
  .delete(deleteStudentById)
  .put(updateStudent);
module.exports = router;
