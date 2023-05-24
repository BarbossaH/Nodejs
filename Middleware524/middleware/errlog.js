const logEvent = require('./logEvent');

const errLog = (err, req, res, next) => {
  logEvent(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errLog;
