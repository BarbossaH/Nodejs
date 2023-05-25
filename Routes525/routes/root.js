const express = require('express');

const router = express.Router();

const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
  //this way can access the index.html, but cannot show the picture directly
  // res.sendFile('./views/index.html', { root: __dirname });

  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new(.html)?', (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, '..', 'views', 'new.html'));
});

//because of the cached data, i visited new-page.html by using old url, so it could cause some potential problem if I don't clean the cached data
router.get('/old(.html)?', (req, res) => {
  res.redirect(301, '/new.html');
});

module.exports = router;
