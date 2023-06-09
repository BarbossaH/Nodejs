/**
 * through checking username and password, and then generate refresh-token and access token,after that, we send them to the front end
 */

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const authLogin = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password, 'just test the destructure is good');
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  //ensure the passed user exists
  const theUser = userDB.users.find((user) => user.username === username);
  console.log(theUser);
  if (!theUser) return res.sendStatus(401); //unauthorized
  //check the password
  // console.log(username, theUser.username);
  // console.log(typeof password, typeof theUser.password);
  const pwdChecked = await bcrypt.compare(password, theUser.password);
  // console.log(pwdChecked);
  if (pwdChecked) {
    //authorized, and then generate the tokens
    //access token, and set user information as the payload
    const roles = Object.values(theUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: theUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '180s' }
    );
    //refresh token
    const refreshToken = jwt.sign(
      {
        userInfo: {
          username: theUser.username,
          roles,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // console.log(accessToken, refreshToken);
    //store the refresh token in database
    const restUsers = userDB.users.filter(
      (user) => user.username !== theUser.username
    );
    // console.log(restUsers);
    const theUserWithToken = { ...theUser, refreshToken };
    // console.log(theUserWithToken);
    const data = [...restUsers, theUserWithToken];
    // console.log(data, 321323223132);
    // userDB.setUsers([...restUsers, theUserWithToken]);
    userDB.setUsers(data);
    // console.log(userDB.users, '999999999');
    //after modify the data in cache, then write into the files
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users),
      'utf8',
      (err) => {
        if (err) console.error('Error writing json file', err);
      }
    );
    //we will sent two tokens separately
    res.cookie('jwt', refreshToken, {
      httpOnly: true, //the value of true means the refresh token only can be transferred in http header
      sameSite: 'None', //allow cross site request
      secure: true, //allow to use https to transfer data
      maxAge: 24 * 60 * 60 * 1000,
      //show add something else
    });
    res.json({ accessToken });
  } else {
    //unauthorized
    res.sendStatus(401);
  }
};

module.exports = authLogin;
