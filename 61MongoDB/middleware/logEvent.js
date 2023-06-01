//date
const { format } = require('date-fns');
//for unique flag
const { v4: uuid } = require('uuid');
//for check the directory's existence
const fs = require('fs');
//for dealing with the operation on files
const fsPromises = require('fs').promises;
//get the path of files and directories
const path = require('path');

const logEvents = async (message, fileName) => {
  // console.log(11111);
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', fileName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;
