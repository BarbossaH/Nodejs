/**
 * logout, mainly delete the refresh token from database and frontend as well.before this, we need to some validation, via the refresh token
 * to check the existence of the user in the request, and we can get the username because we save the username as
 * payload before.
 */

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (users) {
    this.users = users;
  },
};
const fsPromises = require('fs').promises;
const path = require('path');

const logoutHandler = async (req, res) => {
  //get the cookie because jwt saved in cookie
  const cookies = req.cookies;
  // console.log(cookies, 'we just need to inspect req');
  //in some special cases, the refreshtoken doesn't exist. and once it is lost, server doesn't need to do anything
  if (!cookies?.jwt) return res.sendStatus(204); //Not content to return。
  const refreshToken = cookies.jwt; //note jwt sometimes could be other value.here we design it as refresh token
  // via refreshtoken to find the corresponding user
  const theUser = userDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  console.log(theUser);
  //not in db
  if (!theUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //clear the cookie in the frontend
    return res.sendStatus(204);
  }
  //if the user exists, delete the token from database and frontend
  const restUsers = userDB.users.filter(
    (user) => user.refreshToken !== theUser.username
  );
  const theUserWithoutToken = { ...theUser, refreshToken: '' };
  userDB.setUsers([...restUsers, theUserWithoutToken]);
  // console.log(userDB.users, 'rewrite the users.json');

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.users)
  );
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  // res.json({ message: 'exactly' });
  res.sendStatus(204);
};

module.exports = logoutHandler;
