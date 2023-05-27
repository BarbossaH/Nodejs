const express = require('express');

const router = express.Router();

const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
  //this way can access the index.html, but cannot show the picture directly
  // res.sendFile('./views/index.html', { root: __dirname });

  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
