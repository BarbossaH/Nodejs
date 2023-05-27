const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//get router
app.get('^/$|index(.html)?', (req, res) => {
  //this way can access the index.html, but cannot show the picture directly
  // res.sendFile('./views/index.html', { root: __dirname });

  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  // res.send('Hello world');
});

app.get('/new(.html)?', (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, 'views', 'new.html'));
});

//because of the cached data, i visited new-page.html by using old url, so it could cause some potential problem if I don't clean the cached data
app.get('/old(.html)?', (req, res) => {
  res.redirect(301, '/new.html');
});

// the principle of middleware
const stepOne = (req, res, next) => {
  console.log(1);
  next();
};
const stepTwo = (req, res, next) => {
  console.log(2);
  next();
};
const stepThree = (req, res, next) => {
  console.log(3);
  res.send('We finished three steps');
};

app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
  },
  [stepOne, stepTwo, stepThree]
  // (req, res) => {
  //   res.send('Hello world');
  // }
);

//if all url cannot access to any pages, then return 404page, which is default
//but this place should be noticed because the app succeed to response a page named 404, so the default status code is 200, which is not we expect, it should be 404 status code, therefore we need to set the status code to 404
app.get('/*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', '404.html'));
  res.statusCode(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//start the server and make a listen for incoming network connections on a specified port
app.listen(PORT, () => console.log('Server running on ' + `${PORT}`));
