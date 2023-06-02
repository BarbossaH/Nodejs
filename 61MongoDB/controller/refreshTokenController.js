/**
 * based on the cookie to verify the validation of the refresh token
 * if it's valid then generate a new access token and sent it to frontend
 */
//import the model
const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
//this place we don't need to use async function to read or write files or check the password with bcript
const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  // console.log('reqreqreqreq--->', cookies);
  if (!cookies.jwt) return res.sendStatus(401);
  // console.log(cookies?.jwt);
  const refreshToken = cookies.jwt;
  // console.log('refreshToken--->', refreshToken);
  //based on refresh token to find the user because we saved the refresh token before
  const theUser = await User.findOne({ refreshToken }).exec();
  if (!theUser) {
    return res.sendStatus(403); //forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    //decoded contains payload if payload has username, then check the username as well
    //when we register, we used username as the value of the payload, so we can use username as payload here
    if (err || theUser.username !== decoded.userInfo.username) {
      //check the jwt's username is equal to the username in the users.json file

      return res.sendStatus(403);
    }
    // console.log(decoded, theUser, 'just for log');
    //create a new access token after verification
    const roles = Object.values(theUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.userInfo.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '180s' }
    );
    // console.log(accessToken, 'we did it');
    return res.json({ accessToken });
  });
};

module.exports = refreshTokenHandler;
