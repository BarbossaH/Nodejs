//compare the request data with the DB
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  //check the data is completed or not
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  //check the user exists or not
  const existingUser = usersDB.users.find((user) => user.username === username);
  if (existingUser) {
    //check the password
    const isAuth = await bcrypt.compare(password, existingUser.password);
    if (isAuth) {
      //can login create JWT
      res.json({ success: `${username} can login` });
    } else {
      res
        .status(401)
        .json({ message: `${username}'s password is not correct.` });
    }
  } else {
    res.status(401).json({ message: `${username} doesn't exist` });
  }
};

module.exports = loginUser;
