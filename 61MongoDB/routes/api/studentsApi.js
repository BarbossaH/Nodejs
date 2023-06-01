const express = require('express');
const router = express.Router();
const path = require('path');

const ROLE_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

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

//middleware function has four parameters, req, res, next, err. note the order of the parameters
//get() function can have several function as middleware, note the order as well
// router.route('/').get(verifyJWT, getAllStudents).post(addStudent);
router
  .route('/')
  .get(getAllStudents)
  .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), addStudent);

router
  .route('/:id')
  .get(getStudentById)
  .delete(deleteStudentById)
  .put(updateStudent);
module.exports = router;
