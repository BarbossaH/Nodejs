const logEvent = require('./logEvent');
const logger = (req, res, next) => {
  // console.log(`${req.method}  ${req.path}`);
  const msg = `${req.method}\t${req.headers.origin} ${req.url}`;
  logEvent(msg, 'logEvent.txt');
  next();
};

module.exports = logger;
