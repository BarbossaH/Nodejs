const express = require('express');
const router = express.Router();

const registerUser = require('../../controller/registerController');

// console.log(1233);
router.route('/').post(registerUser);

module.exports = router;
