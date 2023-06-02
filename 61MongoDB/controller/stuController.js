const StudentModel = require('../model/StudentSchema');

const getAllStudents = async (req, res) => {
  const students = await StudentModel.find();
  if (!students) return res.status(204).json({ message: 'No students exist' });
  res.json(students);
};

const getStudentById = async (req, res) => {
  const stuId = parseInt(req?.params?.id);
  if (!stuId) return res.status(400).json({ message: 'Id is required' });
  const student = await StudentModel.findOne({ _id: stuId }).exec();
  if (!student) {
    res.status(204).json({ message: `student ${stuId} doesn't exist` });
  } else {
    res.status(201).json(student);
  }
};

const deleteStudentById = async (req, res) => {
  const stuId = req?.params?.id;
  if (!stuId)
    return res.status(400).json({ message: 'Student Id is necessary!' });
  const student = await StudentModel.findOne({ _id: stuId }).exec();
  if (!student) {
    res.status(204).json({ message: `student ${stuId} doesn't exist` });
  }
  const result = await student.deleteOne({ _id: stuId });
  res.status(201).json(result);
};

const addStudent = async (req, res) => {
  const newFirstName = req?.body?.firstname;
  const newLastName = req?.body?.lastname;
  if (!newFirstName || !newLastName)
    return res
      .status(400)
      .json({ message: 'First and last name are necessary!' });

  try {
    const result = await StudentModel.create({
      firstname: newFirstName,
      lastname: newLastName,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }

  //add save the new student to the students array, and then response
};

const updateStudent = async (req, res) => {
  // console.log(req.params.id);
  const stuId = req?.params?.id;
  console.log(stuId);
  if (!stuId) {
    return res.status(400).json({ message: 'Id parameter is required' });
  }
  const student = await StudentModel.findOne({ _id: stuId }).exec();
  if (!student) {
    return res.status(400).json({ message: `Student ${stuId} doesn't exist` });
  }
  //update the every detail from the new data
  const newFirstName = req?.body?.firstname;
  const newLastName = req?.body?.lastname;
  if (newFirstName) {
    student.firstname = newFirstName;
  }
  if (newLastName) {
    student.lastname = newLastName;
  }
  const result = await student.save();
  res.status(201).json(result);
};

module.exports = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  addStudent,
  updateStudent,
};
