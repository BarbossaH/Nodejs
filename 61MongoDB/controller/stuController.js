const StudentModel = require('../model/StudentSchema');

const getAllStudents = (req, res) => {
  res.json(stuData.students);
};

const getStudentById = (req, res) => {
  const stuId = parseInt(req.params.id);
  const student = stuData.students.find((student) => student.id === stuId);
  if (!student) {
    res.status(400).json({ message: `student ${stuId} doesn't exist` });
  } else {
    res.status(201).json(student);
  }
};

const deleteStudentById = (req, res) => {
  const stuId = parseInt(req.params.id);
  const student = stuData.students.find((student) => student.id === stuId);
  if (!student) {
    res.status(400).json({ message: `student ${stuId} doesn't exist` });
  }
  const filteredStu = stuData.students.filter(
    (student) => student.id !== stuId
  );
  stuData.setStudents(filteredStu);
  // stuData.setStudents([...filteredStu]);
  res.status(201).json(stuData.students);
};

const addStudent = (req, res) => {
  const newFirstName = req.body.firstname;
  const newLastName = req.body.lastname;
  if (!newFirstName || !newLastName)
    return res
      .status(400)
      .json({ message: 'First and last name are necessary!' });

  console.log(stuData.students[stuData.students.length - 1]);
  const newStu = {
    id: stuData.students.length //even stuData.students has no any student, it won't be false
      ? stuData.students[stuData.students.length - 1].id + 1
      : 1,
    firstname: newFirstName,
    lastname: newLastName,
  };
  //add save the new student to the students array, and then response
  stuData.setStudents([...stuData.students, newStu]);
  res.status(201).json(stuData.students);
};

const updateStudent = (req, res) => {
  // console.log(req.params.id);
  const stuId = parseInt(req.params.id);
  const student = stuData.students.find((student) => {
    // console.log(student.id);
    return student.id === stuId;
  });
  if (!student) {
    return res.status(400).json({ message: `Student ${stuId} doesn't exist` });
  }
  //update the every detail from the new data
  const newFirstName = req.body.firstname;
  const newLastName = req.body.lastname;
  if (newFirstName) {
    student.firstname = newFirstName;
  }
  if (newLastName) {
    student.lastname = newLastName;
  }
  //get the rest students array
  const filteredStu = stuData.students.filter((stu) => stu.id !== student.id);
  //add the updated student data to the filtered students
  const unsortedStu = [...filteredStu, student];
  //sort the unsortedStu according to id, the bigger one is behind
  const sortedStudents = unsortedStu.sort((a, b) => a.id - b.id);
  stuData.setStudents(sortedStudents);
  // res.status(201).json(sortedStudents);
  res.status(201).json(stuData.students);
};

module.exports = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  addStudent,
  updateStudent,
};
