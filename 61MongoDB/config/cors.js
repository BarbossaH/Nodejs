//Cross origin resource sharing
// const whitelist = ['https://www.google.com', 'http://localhost:3500'];
const whitelist = require('./allowedOrigins');
const corsOptions = {
  origin: (origin, callback) => {
    //check origin web is in the whitelist array or not, if it is in, then return true
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
