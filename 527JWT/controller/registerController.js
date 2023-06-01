//get the user data from database
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

//register user via the uploaded data and write data into user file
const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  //check there is duplicated username or not
  const duplicate = usersDB.users.find((user) => user.username === username);
  if (duplicate) return res.sendStatus(409); //conflict
  //create the new user after check
  try {
    //encrypted the password
    // console.log(typeof password, 12321321321);
    const encryptPwd = await bcrypt.hash(password, 10);
    //store username and pwd
    const newUser = {
      username: username,
      roles: { User: 369 },
      password: encryptPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    // console.log(usersDB.users);
    res.status(201).json({ success: 'New user' + `${username} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = registerUser;
