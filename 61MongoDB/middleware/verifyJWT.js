//verify the token, based on the data in the request header
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // console.log(req.username, 'if it exists');
  // console.log('verify token');
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader);
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  // console.log(authHeader); // to show the format of the header
  const token = authHeader.split(' ')[1]; // Bearer refresh token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log(decoded);
    if (err) {
      return res.sendStatus(403); //forbidden
    }

    //if succeeding, the decoded will contain the jwt's payload, in the auth controller, the payload is userInfo(username and roles)
    //this request doesn't contain the username, so we need to assign the value of username to request.username
    req.username = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

module.exports = verifyToken;
