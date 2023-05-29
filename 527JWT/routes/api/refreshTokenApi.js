//I need express, and router and controller
const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('../../controller/refreshTokenController');
router.get('/', refreshTokenHandler);

module.exports = router;
