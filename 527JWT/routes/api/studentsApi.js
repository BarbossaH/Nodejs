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

const verifyJWT = require('../../middleware/verifyJWT');

const stuData = {};
stuData.students = require('../../model/students.json');

// console.log(typeof stuData.students);

//middleware function has four parameters, req, res, next, err. note the order of the parameters
//get() function can have several function as middleware, note the order as well
router.route('/').get(verifyJWT, getAllStudents).post(addStudent);

router
  .route('/:id')
  .get(getStudentById)
  .delete(deleteStudentById)
  .put(updateStudent);
module.exports = router;
