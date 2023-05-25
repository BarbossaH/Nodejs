const express = require('express');
const router = express.Router();
const path = require('path');
const stuData = {};
stuData.students = require('../../data/students.json');

// console.log(typeof stuData.students);

router
  .route('/')
  .get((req, res) => {
    res.json(stuData.students);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      test: 'test',
    });
  })
  .put((req, res) => {
    res.json({
      response: 'put succeed',
    });
  })
  .delete((req, res) => {
    // console.log(1111);
    res.json({
      dsa: '你发热' + req.body.id, //this is just a test
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    res.json({
      id: req.params.id,
    });
  })
  .delete((req, res) => {
    res.json({
      response: 'I am deleted ' + req.params.id,
    });
  });
module.exports = router;
