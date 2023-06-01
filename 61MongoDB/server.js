require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

connectDB();

const logger = require('./middleware/logger');
const errLog = require('./middleware/errlog');
app.use(logger);

//set up credential before cors, and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
//built-in middleware to handle urlencoded data(form data)
//'content-type':application/x-www-form-urlencoded
//extended: false不支持复杂的嵌套对象和数组，true支持
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static file, if not using this section of code, the css and img file cannot be loaded
// app.use(express.static(path.join(__dirname, '/public'))); //the first parameter has default value '/'
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('^/$', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));

//the first parameter is the bound path by router, this path will be combined with the path inside the router files to form the final address path
app.use('/', require('./routes/root')); //home page doesn't need to check the auth
app.use('/register', require('./routes/api/registerApi')); // register neither
app.use('/login', require('./routes/api/authApi')); // login neither
app.use('/refresh', require('./routes/api/refreshTokenApi'));
app.use('/logout', require('./routes/api/logoutApi'));

app.use(verifyJWT); //below this line, the following page need to check the auth

app.use('/student', require('./routes/api/studentsApi')); //this page need check

//if all url cannot access to any pages, then return 404page, which is default
//but this place should be noticed because the app succeed to response a page named 404, so the default status code is 200, which is not we expect, it should be 404 status code, therefore we need to set the status code to 404
// app.get('/*', (req, res) response all request get post put delete
app.all('/*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404' });
  } else {
    res.type('txt').send('you cannot find me');
  }
});

app.use(errLog);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
//start the server and make a listen for incoming network connections on a specified port
app.listen(PORT, () => console.log('Server running on ' + `${PORT}`));
